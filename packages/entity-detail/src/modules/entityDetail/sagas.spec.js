import {
  actions as formActions,
  SubmissionError
} from 'redux-form'
import {externalEvents, form, actions as actionUtil, actionEmitter, rest, remoteEvents} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects'

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
              takeLatest(actions.LOAD_DETAIL_VIEW, sagas.loadDetailView),
              takeLatest(actions.UNLOAD_DETAIL_VIEW, sagas.unloadDetailView),
              takeLatest(actions.TOUCH_ALL_FIELDS, sagas.touchAllFields),
              takeEvery(actions.SUBMIT_FORM, sagas.submitForm),
              takeEvery(actions.FIRE_TOUCHED, sagas.fireTouched),
              takeEvery(actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate),
              takeEvery(actionUtil.actions.ACTION_INVOKED, sagas.actionInvoked),
              takeEvery(remoteEvents.REMOTE_EVENT, sagas.remoteEvent)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadDetailView saga', () => {
          test('should fetch entity and set it in store', () => {
            const modelPaths = []
            const entityId = 99
            const formName = 'UserSearch'
            const entityName = 'User'
            const formDefinition = {}
            const mode = 'update'

            const gen = sagas.loadDetailView(actions.loadDetailView(modelPaths, entityId))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({entityName, entityId, formName, mode}).value).to.eql(
              call(sagas.loadEntityModel, entityName)
            )

            expect(gen.next().value).to.eql(call(sagas.loadDetailFormDefinition, formName, mode))
            expect(gen.next(formDefinition).value).to.eql(call(sagas.loadData))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          const entity = {paths: {}}

          test('should call create submit', () => {
            const mode = modes.CREATE

            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.createFormSubmit, entity))
            expect(gen.next().done).to.be.true
          })

          test('should call update submit', () => {
            const mode = modes.UPDATE

            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.updateFormSubmit, entity))
            expect(gen.next().done).to.be.true
          })

          test('should handle thrown errors', () => {
            const mode = modes.UPDATE

            const error = new Error('error')
            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.updateFormSubmit, entity))

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
            const payloadValue = gen.next().value.payload.action.payload
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
          const entity = {key: '123', model: 'User', paths: {lastname: 'test'}}
          test('should call updateEntity, load data, show notification and set lastsaved', () => {
            return expectSaga(sagas.updateFormSubmit, entity)
              .provide([
                [matchers.call.fn(updateEntity), null],
                [matchers.call.fn(sagas.loadData), null],
                [matchers.call.fn(sagas.showNotification), null]
              ])
              .call.like({fn: updateEntity})
              .call.like({fn: sagas.loadData})
              .call.like({fn: sagas.showNotification})
              .put.like({action: {type: formActions.stopSubmit().type}})
              .put.like({action: {type: actions.setLastSave().type}})
              .run()
          })
        })

        describe('createFormSubmit saga', () => {
          const entity = {paths: {}}
          const createdEntityId = 99
          const updatedFormValues = {firstname: 'karl'}

          test('should call api and store response', () => {
            const gen = sagas.createFormSubmit(entity)
            expect(gen.next().value).to.eql(call(createEntity, entity))
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
            const formName = 'User'
            const mode = 'update'
            const formDefinition = {}
            const fieldDefinitions = {}

            const gen = sagas.loadDetailFormDefinition(formName, mode)
            expect(gen.next().value).to.eql(call(rest.fetchForm, formName, mode))
            expect(gen.next(formDefinition).value).to.eql(put(actions.setFormDefinition(formDefinition)))
            expect(gen.next().value).to.eql(call(form.getFieldDefinitions, formDefinition))
            expect(gen.next(fieldDefinitions).value).to.eql(put(actions.setFieldDefinitions(fieldDefinitions)))
            const next = gen.next()
            expect(next.value).to.eql({formDefinition, fieldDefinitions})
            expect(next.done).to.be.true
          })
        })

        describe('getEntityForSubmit saga', () => {
          test('should return entity', () => {
            const formValues = {__key: '3', __model: 'User', firstname: 'test'}
            const initialValues = {firstname: 'tst'}

            const entityModel = {}
            const mode = 'update'

            const expectedReturn = {
              model: 'User',
              key: '3',
              version: undefined,
              paths: {firstname: 'test'}
            }

            let firstSelector = true

            return expectSaga(sagas.getEntityForSubmit)
              .provide([
                {
                  select(a, next, b) {
                    if (firstSelector) {
                      firstSelector = false
                      return formValues
                    }
                    return next()
                  }
                },
                [select(sagas.formInitialValueSelector, 'detailForm'), initialValues],
                [select(sagas.entityDetailSelector), {entityModel, mode}],
                [matchers.call.fn(submitValidate), null]
              ])

              .put.like({action: {type: formActions.startSubmit().type}})
              .returns(expectedReturn)
              .run()
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
                [matchers.call.fn(sagas.loadEntity), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntityWithDisplays), {}],
                [matchers.call.fn(sagas.enhanceEntityWithDisplayExpressions), {}]
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
            const fieldDefinitions = [{path: 'firstname'}, {path: 'relGender.label'}]
            return expectSaga(sagas.touchAllFields, action)
              .provide([
                [select(sagas.entityDetailSelector), {fieldDefinitions}]
              ])

              .put(formActions.touch(FORM_ID, 'firstname', 'relGender--label'))
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

        describe('remoteEvent saga', () => {
          const deleteEventAction = remoteEvents.remoteEvent({
            type: 'entity-delete-event',
            payload: {
              entities: [
                {entityName: 'User', key: '1'},
                {entityName: 'Principal', key: '2'}
              ]
            }
          })

          test('should call external event onEntityDeleted', () => {
            const detailState = {
              entityName: 'User',
              entityId: '1'
            }
            return expectSaga(sagas.remoteEvent, deleteEventAction)
              .provide([
                [select(sagas.entityDetailSelector), detailState]
              ])
              .put(externalEvents.fireExternalEvent('onEntityDeleted'))
              .run()
          })

          test('should not call external event onEntityDeleted if irrelevant event', () => {
            const detailState = {
              entityName: 'Classroom',
              entityId: '99'
            }
            return expectSaga(sagas.remoteEvent, deleteEventAction)
              .provide([
                [select(sagas.entityDetailSelector), detailState]
              ])
              .not.put(externalEvents.fireExternalEvent('onEntityDeleted'))
              .run()
          })
        })
      })
    })
  })
})
