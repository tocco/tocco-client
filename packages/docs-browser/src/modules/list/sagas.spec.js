import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as sagas from './sagas'
import * as actions from './actions'

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('list', () => {
          describe('sagas', () => {
            describe('main saga', () => {
              test('should fork sagas', () => {
                const saga = testSaga(sagas.default)
                saga.next().all([
                  takeLatest(actions.CHANGE_LIST_PARENT, sagas.changeListParent)
                ])
              })
            })

            describe('listParentChange', () => {
              test('should fire external onListParentChange event', () => {
                const parent = {model: 'User', key: '1'}
                return expectSaga(sagas.changeListParent, {payload: {parent: parent}})
                  .put(externalEvents.fireExternalEvent('onListParentChange', parent))
                  .run()
              })
            })
          })
        })
      })
    })
  })
})
