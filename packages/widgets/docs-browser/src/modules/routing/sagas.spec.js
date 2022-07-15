import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest} from 'redux-saga/effects'

import * as actions from './actions'
import * as sagas from './sagas'

describe('docs-browser', () => {
  describe('modules', () => {
    describe('routing', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([takeLatest(actions.NAVIGATE, sagas.setParams)])
          })
        })

        describe('setParams', () => {
          test('should extract list path', () => {
            const payload = {
              path: '/docs/folder/1234/list'
            }
            const expectedParams = {
              model: 'folder',
              key: '1234',
              view: 'list'
            }

            return expectSaga(sagas.setParams, {payload}).put(actions.setParams(expectedParams)).run()
          })

          test('should extract detail path', () => {
            const payload = {
              path: '/docs/doc/1234/detail'
            }
            const expectedParams = {
              model: 'doc',
              key: '1234',
              view: 'detail'
            }

            return expectSaga(sagas.setParams, {payload}).put(actions.setParams(expectedParams)).run()
          })

          test('should handle root path', () => {
            const payload = {
              path: '/docs'
            }
            const expectedParams = {}

            return expectSaga(sagas.setParams, {payload}).put(actions.setParams(expectedParams)).run()
          })

          test('should handle root path with trailing slash', () => {
            const payload = {
              path: '/docs/'
            }
            const expectedParams = {}

            return expectSaga(sagas.setParams, {payload}).put(actions.setParams(expectedParams)).run()
          })

          test('should handle empty path', () => {
            const payload = {
              path: '/'
            }
            const expectedParams = {}

            return expectSaga(sagas.setParams, {payload}).put(actions.setParams(expectedParams)).run()
          })
        })
      })
    })
  })
})
