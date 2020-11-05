import {
  actions as formActions, isValid as isValidSelector,
  SubmissionError
} from 'redux-form'
import {externalEvents, form, rest, remoteEvents} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {throwError} from 'redux-saga-test-plan/providers'

import * as actions from './actions'
import {
  updateEntity,
  createEntity
} from '../../util/api/entities'
import modes from '../../util/modes'
import rootSaga, * as sagas from './sagas'
import {focusErrorField, touchAllFields} from './sagas'

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
              takeEvery(remoteEvents.REMOTE_EVENT, sagas.remoteEvent),
              takeLatest(actions.NAVIGATE_TO_ACTION, sagas.navigateToAction)
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

            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.entityDetailSelector), {mode}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(sagas.getEntityForSubmit), entity]
              ])
              .call(sagas.createFormSubmit, entity)
              .run()
          })

          test('should call update submit', () => {
            const mode = modes.UPDATE

            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.entityDetailSelector), {mode}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(sagas.getEntityForSubmit), entity]
              ])
              .call(sagas.updateFormSubmit, entity)
              .run()
          })

          test('should handle thrown errors', () => {
            const mode = modes.UPDATE
            const error = new Error('error')
            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.entityDetailSelector), {mode}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(sagas.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.updateFormSubmit), throwError(error)]

              ])
              .call(sagas.handleSubmitError, error)
              .run()
          })

          test('should call handleInvalidForm on invalid form', () =>
            expectSaga(sagas.submitForm)
              .provide({
                select() {
                  return false
                }
              })
              .call(sagas.handleInvalidForm)
              .not.call(sagas.updateFormSubmit, entity)
              .not.call(sagas.createFormSubmit, entity)
              .run()
          )
        })

        describe('handleSubmitError saga', () => {
          test('should handle submission errors properly', () => {
            const error = new SubmissionError({})
            return expectSaga(sagas.handleSubmitError, error)
              .provide([
                [matchers.call.fn(sagas.touchAllFields), {}],
                [matchers.call.fn(form.formErrorsUtil.getValidatorErrors), {}]
              ])
              .call(sagas.touchAllFields)
              .put(formActions.stopSubmit(FORM_ID, error.errors))
              .run()
          })

          test('should log regular error and show notification', () => {
            const error = new Error('error')

            return expectSaga(sagas.handleSubmitError, error)
              .put(formActions.stopSubmit(FORM_ID))
              .put.like({action: {type: 'tocco-util/LOG_ERROR'}})
              .run()
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
                [matchers.call.fn(form.submitValidation), null]
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

        describe('focusErrorField saga', () => {
          test('should focus first error field', () => {
            const formErrors = {
              firstname: {
                mandatory: ['This is a mandatory field']
              },
              lastname: {
                mandatory: ['This is a mandatory field']
              }
            }
            const elementFocusSpy = sinon.spy()
            const mElement = {focus: elementFocusSpy}
            document.getElementById = sinon.spy(() => mElement)

            return expectSaga(sagas.focusErrorField)
              .provide([
                [matchers.call.fn(sagas.getFormErrors), formErrors]
              ])
              .run()
              .then(result => {
                expect(document.getElementById).to.be.calledWith('input-detailForm-firstname')
                expect(elementFocusSpy).to.be.calledOnce
              })
          })
        })

        describe('handleInvalidForm saga', () => {
          test('should call touch and focus ', () => {
            return expectSaga(sagas.handleInvalidForm)
              .provide([
                [matchers.call.fn(sagas.touchAllFields)],
                [matchers.call.fn(sagas.focusErrorField)]
              ])
              .call(touchAllFields)
              .call(focusErrorField)
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

        describe('navigateToAction saga', () => {
          test('should call external event navigateToAction', () => {
            const payload = {
              selection: {type: 'ID'},
              definition: {appId: 'input-edit'}
            }

            return expectSaga(sagas.navigateToAction, {payload})
              .put.actionType('externalEvents/FIRE_EXTERNAL_EVENT')
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

          test('should call load date on entity update event', () => {
            const updateEventAction = remoteEvents.remoteEvent({
              type: 'entity-update-event',
              payload: {
                entities: [
                  {entityName: 'User', key: '1'}
                ]
              }
            })

            const detailState = {
              entityName: 'User',
              entityId: '1'
            }

            return expectSaga(sagas.remoteEvent, updateEventAction)
              .provide([
                [select(sagas.entityDetailSelector), detailState],
                [matchers.call.fn(sagas.loadData), {paths: {}}]
              ])
              .call(sagas.loadData, false)
              .run()
          })
        })
      })
    })
  })
})
