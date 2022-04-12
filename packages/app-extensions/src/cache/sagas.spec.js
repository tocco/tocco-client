import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest} from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as actions from './actions'
import {clearAll} from './cache'
import rootSaga, * as sagas from './sagas'
import {hasInvalidCache} from './utils'

describe('app-extensions', () => {
  describe('cache', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should fork sagas', () => {
          const saga = testSaga(rootSaga)
          saga.next().all([
            takeLatest(actions.INITIALISE, sagas.init)
          ])
        })
      })

      describe('init', () => {
        beforeEach(() => {
          sagas.resetCacheInitialised()
        })

        afterEach(() => {
          sagas.resetCacheInitialised()
        })

        test('should clear invalid cache', () => {
          return expectSaga(sagas.init)
            .provide([
              [matchers.call(hasInvalidCache), true]
            ])
            .call(hasInvalidCache)
            .call(clearAll)
            .put(actions.setInitialised(true))
            .run()
        })
        
        test('should keep valid cache', () => {
          return expectSaga(sagas.init)
            .provide([
              [matchers.call(hasInvalidCache), false]
            ])
            .call(hasInvalidCache)
            .not.call(clearAll)
            .put(actions.setInitialised(true))
            .run()
        })
        
        test('should run only once', async() => {
          await expectSaga(sagas.init)
            .provide([
              [matchers.call(hasInvalidCache), false]
            ])
            .run()

          return expectSaga(sagas.init)
            .not.call(hasInvalidCache)
            .not.call(clearAll)
            .put(actions.setInitialised(true))
            .run()
        })
      })
    })
  })
})
