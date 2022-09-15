import {actions as formActions} from 'redux-form'
import {SubmissionError} from 'redux-form/es/SubmissionError'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select} from 'redux-saga/effects'

import rest from '../rest'
import formErrorUtils from './formErrors'
import * as sagas from './sagasUtils'

const FORM_ID = 'form'
const formConfig = {
  formId: FORM_ID,
  stateSelector: state => state.module
}

describe('app-extensions', () => {
  describe('form', () => {
    describe('sagasUtils', () => {
      describe('handleSubmitError saga', () => {
        test('should handle submission errors properly', () => {
          const error = new SubmissionError({})
          return expectSaga(sagas.handleSubmitError, formConfig, error)
            .provide([
              [matchers.call.fn(sagas.touchAllFields), {}],
              [matchers.call.fn(formErrorUtils.getValidatorErrors), {}]
            ])
            .call(sagas.touchAllFields, formConfig)
            .put(formActions.stopSubmit(formConfig.formId, error.errors))
            .run()
        })

        test('should log regular error and show notification', () => {
          const error = new Error('error')

          return expectSaga(sagas.handleSubmitError, formConfig, error)
            .put(formActions.stopSubmit(formConfig.formId))
            .put.like({action: {type: 'tocco-util/LOG_ERROR'}})
            .run()
        })

        test('should notify about information errors', () => {
          const error = new rest.InformationError('error')

          return expectSaga(sagas.handleSubmitError, formConfig, error)
            .put(formActions.stopSubmit(formConfig.formId))
            .put.like({
              action: {
                type: 'notification/TOASTER',
                payload: {
                  toaster: {
                    type: 'info',
                    title: 'client.component.form.saveAbortedTitle',
                    body: 'error'
                  }
                }
              }
            })
            .run()
        })

        test('should notify about no permission', () => {
          const error = new rest.ForbiddenException()

          return expectSaga(sagas.handleSubmitError, formConfig, error)
            .put(formActions.stopSubmit(formConfig.formId))
            .put.like({
              action: {
                type: 'notification/TOASTER',
                payload: {
                  toaster: {
                    type: 'error',
                    title: 'client.component.form.saveAbortedTitle',
                    body: 'client.component.form.noPermission'
                  }
                }
              }
            })
            .run()
        })

        test('should stop submit on ClientQuestionCancelledException and not log an error', () => {
          const error = new rest.ClientQuestionCancelledException()

          return expectSaga(sagas.handleSubmitError, formConfig, error)
            .put(formActions.stopSubmit(formConfig.formId))
            .not.put.like({action: {type: 'tocco-util/LOG_ERROR'}})
            .run()
        })
      })

      describe('getEntityForSubmit saga', () => {
        test('should return entity', () => {
          const formValues = {
            __key: '3',
            __model: 'User',
            firstname: 'test',
            relAddress: {
              key: '29242',
              model: 'Address',
              version: 2
            },
            'relAddress--city': 'Bern'
          }
          const initialValues = {firstname: 'tst'}
          const dirtyFormValues = {
            __key: '3',
            __model: 'User',
            firstname: 'test',
            relAddress: {
              key: '29242',
              model: 'Address',
              version: 2
            },
            'relAddress--city': 'Bern'
          }
          const fieldDefinitions = []

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

          return expectSaga(sagas.getEntityForSubmit, formConfig)
            .provide([
              [
                matchers.call.fn(sagas.getCurrentEntityState),
                {mode, initialValues, formValues, dirtyFormValues, fieldDefinitions}
              ]
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
          const fieldDefinitions = []
          const formDefinition = {}

          const expectedReturn = {
            formValues,
            initialValues,
            mode,
            dirtyFormValues: {lastname: 'test2'},
            fieldDefinitions,
            formDefinition
          }

          let firstSelector = true

          return expectSaga(sagas.getCurrentEntityState, formConfig)
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
              [select(sagas.formInitialValueSelector, formConfig.formId), initialValues],
              [select(formConfig.stateSelector), {entityModel, mode, fieldDefinitions, formDefinition}]
            ])
            .returns(expectedReturn)
            .run()
        })
      })

      describe('getEntityForSubmit saga', () => {
        test('should create entity object', () => {
          const formValues = {__model: 'User', __key: '1', firstname: 'test'}
          const dirtyFormValues = formValues
          const fieldDefinitions = []

          const expectedReturn = {
            model: 'User',
            key: '1',
            version: undefined,
            paths: {firstname: 'test'}
          }

          return expectSaga(sagas.getEntityForSubmit, formConfig)
            .provide([[matchers.call.fn(sagas.getCurrentEntityState), {formValues, dirtyFormValues, fieldDefinitions}]])
            .returns(expectedReturn)
            .run()
        })

        test('should map virtual fields to entity fields', () => {
          const formValues = {__model: 'User', __key: '1', location: {postcode: '1234'}}
          const dirtyFormValues = formValues
          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {postcode: 'zip'}
            }
          ]

          const expectedReturn = {
            model: 'User',
            key: '1',
            version: undefined,
            paths: {zip: '1234'}
          }

          return expectSaga(sagas.getEntityForSubmit)
            .provide([[matchers.call.fn(sagas.getCurrentEntityState), {formValues, dirtyFormValues, fieldDefinitions}]])
            .returns(expectedReturn)

            .run()
        })

        test('should map virtual fields to entity fields', () => {
          const formValues = {__model: 'User', __key: '1', location: {postcode: '1234'}, zip: '1234'}
          const dirtyFormValues = formValues
          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {postcode: 'zip'}
            }
          ]

          const expectedReturn = {
            model: 'User',
            key: '1',
            version: undefined,
            paths: {zip: '1234'}
          }

          return expectSaga(sagas.getEntityForSubmit, formConfig)
            .provide([[matchers.call.fn(sagas.getCurrentEntityState), {formValues, dirtyFormValues, fieldDefinitions}]])
            .returns(expectedReturn)
            .run()
        })
      })

      describe('touchAllFields saga', () => {
        test('should call redux form action with all fields', () => {
          const fieldDefinitions = [{path: 'firstname'}, {path: 'relGender.label'}]
          return expectSaga(sagas.touchAllFields, formConfig)
            .provide([[select(formConfig.stateSelector), {fieldDefinitions}]])
            .put(formActions.touch(formConfig.formId, 'firstname', 'relGender--label'))
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

          return expectSaga(sagas.focusErrorField, formConfig)
            .provide([[matchers.call.fn(sagas.getFormErrors), formErrors]])
            .run()
            .then(result => {
              expect(document.getElementById).to.be.calledWith('input-form-firstname')
              expect(elementFocusSpy).to.be.calledOnce
            })
        })

        test('should call focus for first error field', () => {
          const field = 'firstname'
          return expectSaga(sagas.focusErrorField, formConfig)
            .provide([
              [matchers.call.fn(sagas.getFormErrors), []],
              [matchers.call.fn(sagas.focusField), true],
              [matchers.call.fn(formErrorUtils.getFirstErrorField), field]
            ])
            .call(sagas.focusField, formConfig, field)
            .run()
        })
      })

      describe('handleInvalidForm saga', () => {
        test('should call touch and focus ', () => {
          return expectSaga(sagas.handleInvalidForm, formConfig)
            .provide([[matchers.call.fn(sagas.touchAllFields)], [matchers.call.fn(sagas.focusErrorField)]])
            .call(sagas.touchAllFields, formConfig)
            .call(sagas.focusErrorField, formConfig)
            .run()
        })
      })
    })
  })
})
