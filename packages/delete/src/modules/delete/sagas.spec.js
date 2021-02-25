import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest, select} from 'redux-saga/effects'

import * as actions from './actions'
import mainSaga, * as sagas from './sagas'

describe('delete', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('mainSaga', () => {
        test('should fork sagas', () => {
          const saga = testSaga(mainSaga)
          saga.next().all([
            takeLatest(actions.LOAD_DIALOG_INFO, sagas.loadDialogInfo),
            takeLatest(actions.DO_DELETE, sagas.doDelete),
            takeLatest(actions.ON_CANCEL, sagas.onCancel)
          ])
        })
      })

      describe('getDeleteEndpoint', () => {
        test('should return custom endpoint if set', () => {
          const input = {customDeleteEndpoint: 'custom/delete'}
          return expectSaga(sagas.getDeleteEndpoint)
            .provide([
              [select(sagas.inputSelector), input]
            ])
            .returns('custom/delete')
            .run()
        })

        test('should return default endpoint', () => {
          const input = {}
          return expectSaga(sagas.getDeleteEndpoint)
            .provide([
              [select(sagas.inputSelector), input]
            ])
            .returns('client/delete')
            .run()
        })
      })
    })
  })
})
