import {actions as formActions, isValid as isValidSelector} from 'redux-form'
import {SubmissionError} from 'redux-form/es/SubmissionError'
import {externalEvents, form, rest, remoteEvents} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {throwError} from 'redux-saga-test-plan/providers'
import * as formActionTypes from 'redux-form/lib/actionTypes'

import * as actions from './actions'
import {
  updateEntity,
  createEntity
} from '../../util/api/entities'
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
              takeEvery(remoteEvents.REMOTE_EVENT, sagas.remoteEvent),
              takeLatest(actions.NAVIGATE_TO_ACTION, sagas.navigateToAction),
              takeEvery(formActionTypes.BLUR, sagas.onBlur)
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
                [matchers.call.fn(sagas.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.submitValidate)]
              ])
              .put.like({action: {type: formActions.startSubmit().type}})
              .call(sagas.createFormSubmit, entity)
              .run()
          })

          test('should call update submit', () => {
            const mode = modes.UPDATE

            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.entityDetailSelector), {mode}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(sagas.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.submitValidate)]
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
                [matchers.call.fn(sagas.updateFormSubmit), throwError(error)],
                [matchers.call.fn(sagas.submitValidate)]
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

          test('should notify about information errors', () => {
            const error = new rest.InformationError('error')

            return expectSaga(sagas.handleSubmitError, error)
              .put(formActions.stopSubmit(FORM_ID))
              .put.like({
                action: {
                  type: 'notifier/INFO',
                  payload: {
                    type: 'info',
                    title: 'client.entity-detail.saveAbortedTitle',
                    message: 'error',
                    icon: null,
                    timeOut: 5000
                  }
                }
              })
              .run()
          })

          test('should stop submit on ClientQuestionCancelledException and not log an error', () => {
            const error = new rest.ClientQuestionCancelledException()

            return expectSaga(sagas.handleSubmitError, error)
              .put(formActions.stopSubmit(FORM_ID))
              .not.put.like({action: {type: 'tocco-util/LOG_ERROR'}})
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
            const formValues = {
              '__key': '3',
              '__model': 'User',
              'firstname': 'test',
              'relAddress': {
                key: '29242',
                model: 'Address',
                version: 2
              },
              'relAddress--city': 'Bern'
            }
            const initialValues = {firstname: 'tst'}
            const dirtyFields = ['firstname', 'relAddress--city']

            const mode = 'update'

            const expectedReturn = {
              model: 'User',
              key: '3',
              version: undefined,
              paths: {
                firstname: 'test',
                relAddress: {
                  key: '29242',
                  version: 2,
                  paths: {
                    city: 'Bern'
                  }
                }
              }
            }

            return expectSaga(sagas.getEntityForSubmit)
              .provide([
                [matchers.call.fn(sagas.getCurrentEntityState), {mode, initialValues, formValues, dirtyFields}]
              ])
              .returns(expectedReturn)
              .run()
          })
        })

        describe('getCurrentEntityState saga', () => {
          test('should return an object with mode, values and dirty fields', () => {
            const formValues = {firstname: 'test', lastname: 'test2'}
            const initialValues = {firstname: 'test'}
            const entityModel = {}
            const mode = 'update'

            const expectedReturn = {
              formValues,
              initialValues,
              mode,
              dirtyFields: ['lastname']
            }

            let firstSelector = true

            return expectSaga(sagas.getCurrentEntityState)
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
                [select(sagas.entityDetailSelector), {entityModel, mode}]
              ])
              .returns(expectedReturn)
              .run()
          })
        })

        describe('submitValidate saga', () => {
          test('should call submitValidation', () => {
            const formValues = {firstname: 'test'}
            const initialValues = {firstname: 'test1'}
            const mode = 'update'

            return expectSaga(sagas.submitValidate)
              .provide([
                [matchers.call.fn(sagas.getCurrentEntityState), {formValues, initialValues, mode}],
                [matchers.call.fn(form.submitValidation)]
              ])
              .call(form.submitValidation, formValues, initialValues, mode)
              .run()
          })
        })

        describe('getEntityForSubmit saga', () => {
          test('should call submitValidation', () => {
            const formValues = {__model: 'User', __key: '1', firstname: 'test'}
            const dirtyFields = ['firstname']

            const expectedReturn = {
              model: 'User',
              key: '1',
              version: undefined,
              paths: {firstname: 'test'}
            }

            return expectSaga(sagas.getEntityForSubmit)
              .provide([
                [matchers.call.fn(sagas.getCurrentEntityState), {formValues, dirtyFields}]
              ])
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
              .call(sagas.touchAllFields)
              .call(sagas.focusErrorField)
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
              .provide([
                [select(sagas.inputSelector), {navigationStrategy}]
              ])
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
              .provide([
                [select(sagas.inputSelector), {navigationStrategy}]
              ])
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

        describe('autoComplete saga', () => {
          test('should dispatch form value changes accordingly', () => {
            const fieldName = 'firstname'
            const autoCompleteEndpoint = '/nice2/rest/autoComplete'
            const entity = {
              paths: {
                fistname: 'test',
                callname: 'test'
              }
            }

            const response = {
              body: {
                values: {
                  lastname: {
                    mode: 'override',
                    value: 'tocco'
                  },
                  callname: {
                    mode: 'if_empty',
                    value: 'tocco'
                  },
                  callname2: {
                    mode: 'if_empty',
                    value: 'tocco'
                  }
                }
              }
            }

            const formValues = {
              firstname: 'test',
              callname: 'test'
            }

            return expectSaga(sagas.autoComplete, fieldName, autoCompleteEndpoint)
              .provide([
                [matchers.call.fn(sagas.getEntityForSubmit), entity],
                [matchers.call.fn(rest.requestSaga), response],
                {
                  select() {
                    return formValues
                  }
                }
              ])
              .put(formActions.change(FORM_ID, 'lastname', 'tocco'))
              .put(formActions.change(FORM_ID, 'callname2', 'tocco'))
              .not.put(formActions.change(FORM_ID, 'callname', 'tocco'))
              .run()
          })
        })

        describe('onBlur saga', () => {
          test('should call autoComplete if endpoint is defined', () => {
            const field = 'firstname'
            const input = {
              meta: {
                field
              }
            }

            const autoCompleteEndpoint = '/autoComplete'

            const entityDetailState = {
              fieldDefinitions: [
                {
                  id: field,
                  autoCompleteEndpoint
                }
              ]
            }
            return expectSaga(sagas.onBlur, input)
              .provide([
                [select(sagas.entityDetailSelector), entityDetailState],
                [matchers.call.fn(sagas.autoComplete)]
              ])
              .call(sagas.autoComplete, field, autoCompleteEndpoint)
              .run()
          })

          test('should not call autoComplete if endpoint is not defined', () => {
            const field = 'firstname'
            const input = {
              meta: {
                field
              }
            }

            const entityDetailState = {
              fieldDefinitions: [
                {
                  id: field
                }
              ]
            }
            return expectSaga(sagas.onBlur, input)
              .provide([
                [select(sagas.entityDetailSelector), entityDetailState],
                [matchers.call.fn(sagas.autoComplete)]
              ])
              .not.call.like({fn: sagas.autoComplete})
              .run()
          })
        })

        describe('focusErrorField saga', () => {
          test('should call focus for first error field', () => {
            const field = 'firstname'
            return expectSaga(sagas.focusErrorField)
              .provide([
                [matchers.call.fn(sagas.getFormErrors), []],
                [matchers.call.fn(sagas.focusField), true],
                [matchers.call.fn(form.formErrorsUtil.getFirstErrorField), field]
              ])
              .call(sagas.focusField, field)
              .run()
          })

          test('should call location fallback', () => {
            const field = 'postcode_c'
            return expectSaga(sagas.focusErrorField)
              .provide([
                [matchers.call.fn(sagas.getFormErrors), []],
                [matchers.call.fn(sagas.focusField), false],
                [matchers.call.fn(form.formErrorsUtil.getFirstErrorField), field],
                [matchers.call.fn(sagas.locationFieldFocus)]
              ])
              .call(sagas.locationFieldFocus, field)
              .run()
          })

          describe('locationFieldFocus saga', () => {
            test('should call focus for first error field', () => {
              const field = 'postcode_c'
              const locationField = 'location_c'
              const fieldDefinitions = [
                {id: locationField, locationMapping: {postcode: field}}
              ]
              return expectSaga(sagas.locationFieldFocus, field)
                .provide([
                  [select(sagas.entityDetailSelector), {fieldDefinitions}],
                  [matchers.call.fn(sagas.focusField), true]
                ])
                .call(sagas.focusField, locationField)
                .run()
            })
          })
        })
      })
    })
  })
})
