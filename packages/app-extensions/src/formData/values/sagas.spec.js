import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {actions as formActions} from 'redux-form'
import {fork, takeEvery} from 'redux-saga/effects'

import * as actions from './actions'
import * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('values', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              fork(takeEvery, actions.CHANGE_FIELD_VALUE, sagas.changeValue),
              fork(takeEvery, actions.TOUCH_FIELD, sagas.touchField)
            ])
          })
        })

        describe('changeValue saga', () => {
          test('should put redux form action', () => {
            const formName = 'detailForm'
            const field = 'firstname'
            const value = 'Test'

            return expectSaga(
              sagas.changeValue, actions.changeFieldValue(formName, field, value)
            )
              .put(formActions.change(formName, field, value))
              .run()
          })
        })

        describe('touchField saga', () => {
          test('should put redux form action', () => {
            const formName = 'detailForm'
            const field = 'firstname'

            return expectSaga(
              sagas.touchField, actions.touchField(formName, field)
            )
              .put(formActions.touch(formName, field))
              .run()
          })
        })
      })
    })
  })
})
