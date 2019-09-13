import {
  actions as formActions,
  SubmissionError
} from 'redux-form'
import {externalEvents, form, actions as actionUtil, actionEmitter, rest} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, put, fork, select, takeLatest, takeEvery, all} from 'redux-saga/effects'

import * as actions from './actions'
import {
  updateEntity,
  createEntity
} from '../../util/api/entities'
import {submitValidate} from '../../util/detailView/asyncValidation'
import modes from '../../util/modes'
import rootSaga, * as sagas from './sagas'

const FORM_ID = 'detailForm'

describe('entity-detail', () => {
  describe('modules', () => {
    describe('entityDetail', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.LOAD_DETAIL_VIEW, sagas.loadDetailView),
              fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, sagas.unloadDetailView),
              fork(takeLatest, actions.TOUCH_ALL_FIELDS, sagas.touchAllFields),
              fork(takeEvery, actions.SUBMIT_FORM, sagas.submitForm),
              fork(takeEvery, actions.FIRE_TOUCHED, sagas.fireTouched),
              fork(takeEvery, actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate),
              fork(takeEvery, actionUtil.actions.ACTION_INVOKED, sagas.actionInvoked)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadDetailView saga', () => {
          test('should fetch entity and set it in store', () => {
            const modelPaths = []
            const entityId = 99
            const formName = 'UserSearch_detail'
            const entityName = 'User'
            const formDefinition = {}
            const mode = 'update'

            const gen = sagas.loadDetailView(actions.loadDetailView(modelPaths, entityId))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({entityName, entityId, formName, mode}).value).to.eql(
              call(sagas.loadEntityModel, entityName)
            )

            expect(gen.next().value).to.eql(call(sagas.loadDetailFormDefinition, formName))
            expect(gen.next(formDefinition).value).to.eql(call(sagas.loadData))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          const entity = {paths: {}}
          const fields = ['firstname']

          test('should call create submit', () => {
            const mode = modes.CREATE

            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.getPaths))
            expect(gen.next(fields).value).to.eql(call(sagas.createFormSubmit, entity, fields))
            expect(gen.next().done).to.be.true
          })

          test('should call update submit', () => {
            const mode = modes.UPDATE

            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.getPaths))
            expect(gen.next(fields).value).to.eql(call(sagas.updateFormSubmit, entity, fields))
            expect(gen.next().done).to.be.true
          })

          test('should handle thrown errors', () => {
            const mode = modes.UPDATE

            const error = new Error('error')
            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.getPaths))
            expect(gen.next(fields).value).to.eql(call(sagas.updateFormSubmit, entity, fields))

            expect(gen.throw(error).value).to.eql(call(sagas.handleSubmitError, error))
            expect(gen.next().done).to.be.true
          })
        })

        describe('handleSubmitError saga', () => {
          test('should handle submission errors properly', () => {
            const error = new SubmissionError({})

            const gen = sagas.handleSubmitError(error)
            expect(gen.next().value).to.eql(call(sagas.touchAllFields))
            expect(gen.next().value).to.eql(put(formActions.stopSubmit(FORM_ID, error.errors)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'warning', 'saveAbortedTitle', 'saveAbortedMessage', 5000)
            )
            expect(gen.next().done).to.be.true
          })

          test('should log regular error and show notification', () => {
            const error = new Error('error')

            const gen = sagas.handleSubmitError(error)

            const payloadValue = gen.next().value.PUT.action.payload
            // workaround to avoid test fail due to mismatch of Date.now
            expect(payloadValue).to.include(
              {title: 'client.common.unexpectedError', description: 'client.entity-detail.saveError', error}
            )
            expect(gen.next().value).to.eql(put(formActions.stopSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'warning', 'saveAbortedTitle', 'saveAbortedMessage', 5000)
            )
            expect(gen.next().done).to.be.true
          })
        })

        describe('updateFormSubmit saga', () => {
          const entity = {paths: {}}
          const fields = ['firstname']
          const updatedEntity = {paths: {}}
          const updatedFormValues = {firstname: 'karl'}

          test('should call api and store response', () => {
            const gen = sagas.updateFormSubmit(entity, fields)
            expect(gen.next().value).to.eql(call(updateEntity, entity, fields))
            expect(gen.next(updatedEntity).value).to.eql(call(form.entityToFormValues, updatedEntity))
            expect(gen.next(updatedFormValues).value).to.eql(put(formActions.initialize(FORM_ID, updatedFormValues)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage')
            )
            // because of setLastSave creates a new time stamp if no argument is passed, the test failed some times.
            // That's why we only check if the SET_LAST_SAVE action was called instead of the whole PUT object.
            const next = gen.next().value.PUT.action.type
            expect(next).to.eql('entityDetail/SET_LAST_SAVE')
            expect(gen.next().value).to.eql(put(formActions.stopSubmit(FORM_ID)))

            expect(gen.next().done).to.be.true
          })
        })

        describe('createFormSubmit saga', () => {
          const entity = {paths: {}}
          const fields = ['firstname']
          const createdEntityId = 99
          const updatedFormValues = {firstname: 'karl'}

          test('should call api and store response', () => {
            const gen = sagas.createFormSubmit(entity, fields)
            expect(gen.next().value).to.eql(call(createEntity, entity, fields))
            expect(gen.next(createdEntityId).value).to.eql(
              put(externalEvents.fireExternalEvent('onEntityCreated', {id: createdEntityId}))
            )
            expect(gen.next(updatedFormValues).value).to.eql(
              call(sagas.showNotification, 'success', 'createSuccessfulTitle', 'createSuccessfulMessage')
            )
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadDetailFormDefinition saga', () => {
          test('should load formDefinition, save to store and return ', () => {
            const formName = 'User_detail'
            const formDefinition = {}

            const gen = sagas.loadDetailFormDefinition(formName)
            expect(gen.next().value).to.eql(call(rest.fetchForm, formName))
            expect(gen.next(formDefinition).value).to.eql(put(actions.setFormDefinition(formDefinition)))
            const next = gen.next(formDefinition)
            expect(next.value).to.eql(formDefinition)
            expect(next.done).to.be.true
          })
        })

        describe('getEntityForSubmit saga', () => {
          test('should return entity', () => {
            const values = {fistname: 'test'}
            const initialValues = {fistname: 'tst'}

            const entityName = 'User'
            const entityId = '3'
            const entityModel = {}
            const formDefinition = {}
            const mode = 'update'
            const dirtyFields = ['firstname']
            const entity = {paths: {}}

            const gen = sagas.getEntityForSubmit()
            gen.next()
            gen.next(values) // first two selects references are not comparable and therefore no tests possible

            expect(gen.next(initialValues).value).to.eql(put(formActions.startSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({entityName, entityId, entityModel, formDefinition, mode}).value).to.eql(
              call(submitValidate, values, initialValues, entityName, entityId, entityModel, mode)
            )

            expect(gen.next().value).to.eql(call(form.getDirtyFields, initialValues, values, false))
            expect(gen.next(dirtyFields).value).to.eql(
              call(form.formValuesToEntity, values, dirtyFields, entityName, entityId, entityModel)
            )

            const next = gen.next(entity)
            expect(next.value).to.eql(entity)
            expect(next.done).to.be.true
          })
        })

        describe('getPaths saga', () => {
          test('should return array of fields', () => {
            const formDefinition = {}
            const fieldDefinitions = {}

            const gen = sagas.getPaths()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))

            expect(gen.next({formDefinition}).value).to.eql(call(form.getFieldDefinitions, formDefinition))
            expect(gen.next(fieldDefinitions).value).to.eql(call(form.getUsedPaths, fieldDefinitions))

            const next = gen.next(fieldDefinitions)
            expect(next.value).to.eql(fieldDefinitions)
            expect(next.done).to.be.true
          })
        })

        describe('fireTouched saga', () => {
          test('should fire external event if state changed', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: false}).value)
              .to.eql(put(externalEvents.fireExternalEvent('onTouchedChange', {touched: true})))
            expect(gen.next().value).to.eql(put(actions.setTouched(true)))

            expect(gen.next().done).to.be.true
          })

          test('should not fire external event if state did not change', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: true}).done).to.be.true
          })
        })

        describe('loadData saga', () => {
          test('should fetch the entity and call form initialize', () => {
            return expectSaga(sagas.loadData)
              .provide([
                [select(sagas.entityDetailSelector), {}],
                [matchers.call.fn(sagas.loadEntity), {paths: {}}]
              ])
              .call.like({fn: sagas.loadEntity})
              .call.like({fn: form.entityToFormValues})
              .put.like({action: {type: formActions.initialize().type}})
              .run()
          })
        })

        describe('actionInvoked saga', () => {
          test('should refresh the data and emit the action', () => {
            const action = {}
            return expectSaga(sagas.actionInvoked, action)
              .provide([
                [matchers.call.fn(sagas.loadData), {}]
              ])
              .call.like({fn: sagas.loadData})
              .put(actionEmitter.emitAction(action))
              .run()
          })
        })

        describe('touchAllFields saga', () => {
          test('should call redux form action with all fields', () => {
            const action = {}
            return expectSaga(sagas.touchAllFields, action)
              .provide([
                [select(sagas.entityDetailSelector), {}],
                [matchers.call.fn(form.getFieldDefinitions), [{id: 'firstname'}, {id: 'lastname'}]]
              ])

              .put(formActions.touch(FORM_ID, 'firstname', 'lastname'))
              .run()
          })
        })

        describe('navigateToCreate saga', () => {
          test('should call external event onNavigateToCreate', () => {
            const payload = {
              relationName: 'relUser'
            }

            return expectSaga(sagas.navigateToCreate, {payload})
              .put(externalEvents.fireExternalEvent('onNavigateToCreate', payload.relationName))
              .run()
          })
        })
      })
    })
  })
})
