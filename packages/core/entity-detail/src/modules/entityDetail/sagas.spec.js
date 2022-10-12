import {actions as formActions, isValid as isValidSelector} from 'redux-form'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {all, call, put, select, takeEvery, takeLatest, take} from 'redux-saga/effects'
import {
  actions as actionExtensions,
  externalEvents,
  form,
  remoteEvents,
  rest,
  reports,
  appFactory
} from 'tocco-app-extensions'
import {intl} from 'tocco-util'

import {createEntity, updateEntity} from '../../util/api/entities'
import modes from '../../util/modes'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const FORM_ID = 'detailForm'

describe('entity-detail', () => {
  describe('modules', () => {
    describe('entityDetail', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeLatest(appFactory.INPUT_CHANGED, sagas.inputChanged),
                takeLatest(actions.LOAD_DETAIL_VIEW, sagas.loadDetailView),
                takeLatest(actions.UNLOAD_DETAIL_VIEW, sagas.unloadDetailView),
                takeLatest(actions.TOUCH_ALL_FIELDS, form.sagasUtils.touchAllFields, sagas.formSagaConfig),
                takeEvery(actions.SUBMIT_FORM, sagas.submitForm),
                takeEvery(actions.FIRE_TOUCHED, sagas.fireTouched),
                takeEvery(actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate),
                takeEvery(remoteEvents.REMOTE_EVENT, sagas.remoteEvent),
                takeLatest(actions.NAVIGATE_TO_ACTION, sagas.navigateToAction),
                takeLatest(actions.UPDATE_MARKED, sagas.updateMarked),
                takeLatest(actionExtensions.actions.ACTION_INVOKED, sagas.reloadAfterAction)
              ])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadDetailView saga', () => {
          test('should fetch entity and set it in store', () => {
            const entityId = 99
            const formName = 'UserSearch'
            const entityName = 'User'
            const formDefinition = {}
            const mode = 'update'

            const gen = sagas.loadDetailView()
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({entityName, entityId, formName, mode}).value).to.eql(
              call(sagas.loadEntityModel, entityName)
            )

            expect(gen.next().value).to.eql(call(sagas.loadDetailFormDefinition, formName, mode, entityName, entityId))
            expect(gen.next(formDefinition).value).to.eql(call(sagas.loadData))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          const entity = {paths: {}}

          test('should call create submit', () => {
            const mode = modes.CREATE
            const fieldDefinitions = []

            return expectSaga(sagas.submitForm)
              .provide([
                [select(intl.localeSelector), 'de'],
                [select(sagas.inputSelector), {mode}],
                [select(sagas.entityDetailSelector), {fieldDefinitions}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(form.sagasUtils.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.submitValidate)],
                [matchers.call.fn(sagas.createFormSubmit)]
              ])
              .put.like({action: {type: formActions.startSubmit().type}})
              .call(sagas.createFormSubmit, entity, fieldDefinitions)
              .put(actions.setFormSubmitted())
              .run()
          })

          test('should call update submit', () => {
            const mode = modes.UPDATE
            const fieldDefinitions = []

            return expectSaga(sagas.submitForm)
              .provide([
                [select(intl.localeSelector), 'de'],
                [select(sagas.inputSelector), {mode}],
                [select(sagas.entityDetailSelector), {fieldDefinitions}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(form.sagasUtils.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.submitValidate)],
                [matchers.call.fn(sagas.updateFormSubmit)]
              ])
              .call(sagas.updateFormSubmit, entity, fieldDefinitions)
              .put(actions.setFormSubmitted())
              .run()
          })

          test('should handle thrown errors', () => {
            const mode = modes.UPDATE
            const fieldDefinitions = []
            const error = new Error('error')
            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.inputSelector), {mode}],
                [select(sagas.entityDetailSelector), {fieldDefinitions}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(form.sagasUtils.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.updateFormSubmit), throwError(error)],
                [matchers.call.fn(sagas.submitValidate)]
              ])
              .call(form.sagasUtils.handleSubmitError, sagas.formSagaConfig, error)
              .put(actions.setFormSubmissionFailed())
              .run()
          })

          test('should call handleInvalidForm on invalid form', () =>
            expectSaga(sagas.submitForm)
              .provide({
                select() {
                  return false
                }
              })
              .call(form.sagasUtils.handleInvalidForm, sagas.formSagaConfig)
              .not.call(sagas.updateFormSubmit, entity)
              .not.call(sagas.createFormSubmit, entity)
              .put(actions.setFormSubmissionFailed())
              .run())
        })

        describe('updateFormSubmit saga', () => {
          const entity = {key: '123', model: 'User', paths: {lastname: 'test'}}
          test('should call updateEntity, load data, show notification and set lastsaved', () => {
            const updateResponse = {status: 200}
            return expectSaga(sagas.updateFormSubmit, entity)
              .provide([
                [matchers.call.fn(updateEntity), updateResponse],
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

          test('should call delete event on 404 response', () => {
            const updateResponse = {status: 404}
            return expectSaga(sagas.updateFormSubmit, entity)
              .provide([[matchers.call.fn(updateEntity), updateResponse]])
              .call.like({fn: updateEntity})
              .not.call.like({fn: sagas.loadData})

              .put(externalEvents.fireExternalEvent('onEntityDeleted'))
              .run()
          })
        })

        describe('createFormSubmit saga', () => {
          const entity = {paths: {}}
          const fieldDefinitions = []
          const formDefinition = {}
          const createdEntityId = 99

          test('should call api and store response', () => {
            return expectSaga(sagas.createFormSubmit, entity, fieldDefinitions)
              .provide([
                [call(form.sagasUtils.getCurrentEntityState, sagas.formSagaConfig), {formDefinition}],
                [call(createEntity, entity, fieldDefinitions, formDefinition), createdEntityId]
              ])
              .put(externalEvents.fireExternalEvent('onEntityCreated', {id: createdEntityId}))
              .call(sagas.showNotification, 'success', 'createSuccessfulTitle', 'createSuccessfulMessage')
              .run()
          })
        })

        describe('loadDetailFormDefinition saga', () => {
          test('should load formDefinition, save to store and return ', () => {
            const formName = 'User'
            const mode = 'update'
            const formDefinition = {}
            const fieldDefinitions = {}
            const modifyFormDefinition = formDef => formDef
            return expectSaga(sagas.loadDetailFormDefinition, formName, mode)
              .provide([
                [call(rest.fetchForm, formName, mode), formDefinition],
                [select(sagas.inputSelector), {modifyFormDefinition}],
                [call(form.getFieldDefinitions, formDefinition), fieldDefinitions]
              ])
              .put(actions.setFormDefinition(formDefinition))
              .put(actions.setFieldDefinitions(fieldDefinitions))
              .returns({formDefinition, fieldDefinitions})
              .run()
          })

          test('should handle report ids', () => {
            const entityName = 'Entity_name'
            const formName = 'User'
            const mode = 'update'
            const formDefinition = {children: []}
            const modifiedFormDefinition = {children: [{id: 'fake modified child'}]}
            const fieldDefinitions = {}
            const reportDefinitions = [{}]
            const modifyFormDefinition = formDef => formDef
            return expectSaga(sagas.loadDetailFormDefinition, formName, mode, entityName)
              .provide([
                [matchers.call.fn(rest.fetchForm, formName, mode), formDefinition],
                [select(sagas.inputSelector), {modifyFormDefinition, reportIds: ['report-id']}],
                [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions],
                [matchers.call.fn(form.addReports), modifiedFormDefinition],
                [take(reports.SET_REPORTS), {payload: {reports: reportDefinitions}}]
              ])
              .put(reports.loadReports(['report-id'], entityName, 'detail'))
              .call.like({
                fn: form.addReports,
                args: [formDefinition, reportDefinitions]
              })
              .returns({formDefinition: modifiedFormDefinition, fieldDefinitions})
              .run()
          })
        })

        describe('submitValidate saga', () => {
          test('should call submitValidation', () => {
            const formValues = {firstname: 'test'}
            const initialValues = {firstname: 'test1'}
            const mode = 'update'
            const fieldDefinitions = []
            const formDefinition = {}

            return expectSaga(sagas.submitValidate)
              .provide([
                [
                  matchers.call.fn(form.sagasUtils.getCurrentEntityState),
                  {formValues, initialValues, mode, fieldDefinitions, formDefinition}
                ],
                [matchers.call.fn(form.submitValidation)]
              ])
              .call(form.submitValidation, formValues, initialValues, fieldDefinitions, formDefinition, mode)
              .run()
          })
        })

        describe('fireTouched saga', () => {
          test('should fire external event if state changed', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: false}).value).to.eql(
              put(externalEvents.fireExternalEvent('onTouchedChange', {touched: true}))
            )
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
            const entityDetail = {
              entityModel: {markable: true},
              fieldDefinitions: [],
              formDefinition: {markable: true}
            }
            return expectSaga(sagas.loadData)
              .provide([
                [select(sagas.inputSelector), {}],
                [select(sagas.entityDetailSelector), entityDetail],
                [matchers.fork.fn(sagas.loadMarked)],
                [matchers.call.fn(sagas.loadEntity), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntityWithDisplays), {}],
                [matchers.call.fn(sagas.enhanceEntityWithDisplayExpressions), {}]
              ])
              .fork.like({fn: sagas.loadMarked})
              .call.like({fn: sagas.loadEntity})
              .call.like({fn: form.entityToFormValues})
              .put.like({action: {type: formActions.initialize().type}})
              .run()
          })
        })

        describe('navigateToCreate saga', () => {
          test('should call navigationStrategy', () => {
            const payload = {
              relationName: 'relUser'
            }

            const navigationStrategy = {
              navigateToCreateRelative: () => {}
            }

            return expectSaga(sagas.navigateToCreate, {payload})
              .provide([[select(sagas.inputSelector), {navigationStrategy}]])
              .call(navigationStrategy.navigateToCreateRelative, payload.relationName)
              .run()
          })
        })

        describe('navigateToAction saga', () => {
          test('should call external event navigateToAction', () => {
            const payload = {
              selection: {type: 'ID'},
              definition: {appId: 'input-edit'}
            }

            const navigationStrategy = {
              navigateToActionRelative: () => {}
            }

            return expectSaga(sagas.navigateToAction, {payload})
              .provide([[select(sagas.inputSelector), {navigationStrategy}]])
              .call(navigationStrategy.navigateToActionRelative, payload.definition, payload.selection)
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
            const inputState = {
              entityName: 'User',
              entityId: '1'
            }
            return expectSaga(sagas.remoteEvent, deleteEventAction)
              .provide([[select(sagas.inputSelector), inputState]])
              .put(externalEvents.fireExternalEvent('onEntityDeleted'))
              .run()
          })

          test('should not call external event onEntityDeleted if irrelevant event', () => {
            const inputState = {
              entityName: 'Classroom',
              entityId: '99'
            }
            return expectSaga(sagas.remoteEvent, deleteEventAction)
              .provide([[select(sagas.inputSelector), inputState]])
              .not.put(externalEvents.fireExternalEvent('onEntityDeleted'))
              .run()
          })

          test('should call load date on entity update event', () => {
            const updateEventAction = remoteEvents.remoteEvent({
              type: 'entity-update-event',
              payload: {
                entities: [{entityName: 'User', key: '1'}]
              }
            })

            const inputState = {
              entityName: 'User',
              entityId: '1'
            }

            return expectSaga(sagas.remoteEvent, updateEventAction)
              .provide([
                [select(sagas.inputSelector), inputState],
                [matchers.call.fn(sagas.loadData), {paths: {}}]
              ])
              .call(sagas.loadData, false)
              .run()
          })

          test('should trigger external action event', () => {
            const triggerActionEvent = remoteEvents.remoteEvent({
              type: 'action-trigger-event',
              payload: {
                func: actions.setMarked,
                args: [true]
              }
            })

            const inputState = {
              entityName: 'User',
              entityId: '1'
            }

            return expectSaga(sagas.remoteEvent, triggerActionEvent)
              .provide([[select(sagas.inputSelector), inputState]])
              .put(actions.setMarked(true))
              .run()
          })
        })
      })
    })
  })
})
