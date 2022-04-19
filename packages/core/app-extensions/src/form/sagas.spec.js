import {actions as formActions} from 'redux-form'
import * as formActionTypes from 'redux-form/lib/actionTypes'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, debounce, select, takeEvery} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import rootSaga, * as sagas from './sagas'
import * as sagasUtils from './sagasUtils'

const FORM_ID = 'form'
const formConfig = {
  formId: FORM_ID,
  stateSelector: state => state.module
}

describe('app-extensinos', () => {
  describe('form', () => {
    describe('sagas', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga(formConfig)
          expect(generator.next().value).to.deep.equal(
            all([
              debounce(500, formActionTypes.CHANGE, sagas.onChange, formConfig),
              takeEvery(formActionTypes.STOP_ASYNC_VALIDATION, sagas.asyncValidationStop)
            ])
          )
          expect(generator.next().done).to.be.true
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

          return expectSaga(sagas.autoComplete, formConfig, fieldName, entity, autoCompleteEndpoint)
            .provide([
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

      describe('onChange saga', () => {
        test('should call autoComplete if endpoint is defined', () => {
          const field = 'firstname'
          const input = {
            meta: {
              field
            }
          }
          const entity = {
            paths: {
              fistname: 'test',
              callname: 'test'
            }
          }

          const autoCompleteEndpoint = '/autoComplete'

          const moduleState = {
            fieldDefinitions: [
              {
                id: field,
                autoCompleteEndpoint
              }
            ]
          }
          return expectSaga(sagas.onChange, formConfig, input)
            .provide([
              [matchers.call.fn(sagasUtils.getEntityForSubmit), entity],
              [select(formConfig.stateSelector), moduleState],
              [matchers.call.fn(sagas.autoComplete)]
            ])
            .call(sagas.autoComplete, formConfig, field, entity, autoCompleteEndpoint)
            .run()
        })

        test('should not call autoComplete if endpoint is not defined', () => {
          const field = 'firstname'
          const input = {
            meta: {
              field
            }
          }
          const entity = {
            paths: {
              fistname: 'test',
              callname: 'test'
            }
          }

          const moduleState = {
            fieldDefinitions: [
              {
                id: field
              }
            ]
          }
          return expectSaga(sagas.onChange, formConfig, input)
            .provide([
              [matchers.call.fn(sagasUtils.getEntityForSubmit), entity],
              [select(formConfig.stateSelector), moduleState],
              [matchers.call.fn(sagas.autoComplete)]
            ])
            .not.call.like({fn: sagas.autoComplete})
            .run()
        })
      })

      describe('asyncValidationStop saga', () => {
        test('should show a toaster if outdated error is returned by the validation', () => {
          const asyncValidationStopAction = {
            payload: {
              _error: {
                outdatedError: {
                  model: 'User',
                  sameEntity: true,
                  updateTimestamp: '2021-07-27T14:15:18.220Z',
                  updateUser: 'user3'
                }
              }
            }
          }

          return expectSaga(sagas.asyncValidationStop, asyncValidationStopAction)
            .put.like({action: {type: 'notification/TOASTER'}})
            .run()
        })
      })
    })
  })
})
