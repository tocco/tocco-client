import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call} from 'redux-saga/effects'
import {appFactory, cache as cacheHelpers, notification} from 'tocco-app-extensions'
import {cache} from 'tocco-util'

import rootSaga, * as sagas from './sagas'

describe('widgets', () => {
  describe('modules', () => {
    describe('entity-browser', () => {
      describe('entityBrowser', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            test('should fork sagas', () => {
              const saga = testSaga(rootSaga)
              saga.next().all([call(sagas.initialize)])
            })
          })

          describe('initialize', () => {
            test('initialize', () => {
              return expectSaga(sagas.initialize)
                .provide([
                  [matchers.take(appFactory.INPUT_INITIALIZED), {}],
                  [matchers.call(cacheHelpers.hasInvalidCache), true]
                ])
                .call(cacheHelpers.hasInvalidCache)
                .call(cache.clearAll)
                .put(notification.connectSocket())
                .run()
            })
          })
        })
      })
    })
  })
})
