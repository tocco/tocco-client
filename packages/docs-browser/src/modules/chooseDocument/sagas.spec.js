import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest} from 'redux-saga/effects'
import {notification} from 'tocco-app-extensions'

import * as sagas from './sagas'
import * as actions from './actions'

describe('docs-browser', () => {
  describe('modules', () => {
    describe('chooseDocument', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              takeLatest(actions.CHOOSE_DOCUMENT, sagas.chooseDocument)
            ])
          })
        })

        describe('chooseDocument', () => {
          test('should choose resource from dms', () => {
            const payload = {
              setDocument: () => {},
              formName: 'formName',
              formFieldId: 'fieldId'
            }
            return expectSaga(sagas.chooseDocument, {payload})
              .put.actionType(notification.modal().type)
              .run()
          })
        })
      })
    })
  })
})
