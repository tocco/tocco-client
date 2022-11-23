import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {all, takeEvery} from 'redux-saga/effects'
import {rest, externalEvents} from 'tocco-app-extensions'
import {cache} from 'tocco-util'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('reload-configuration', () => {
  describe('modules', () => {
    describe('configuration', () => {
      describe('sagas', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(
            all([takeEvery(actions.FETCH_DATA, sagas.fetchData), takeEvery(actions.POST_DATA, sagas.postData)])
          )
          expect(generator.next().done).to.be.true
        })

        describe('fetchData', () => {
          const fakeResponse = {
            body: {
              configurations: [
                {
                  name: 'reports',
                  id: 'reports'
                },
                {
                  name: 'data',
                  id: 'data'
                },
                {
                  name: 'form',
                  id: 'form'
                },
                {
                  name: 'cms',
                  id: 'cms'
                },
                {
                  name: 'textresources',
                  id: 'textresources'
                },
                {
                  name: 'menu',
                  id: 'menu'
                },
                {
                  name: 'acl',
                  id: 'acl'
                }
              ]
            }
          }

          const data = [
            {
              name: 'reports',
              id: 'reports'
            },
            {
              name: 'data',
              id: 'data'
            },
            {
              name: 'form',
              id: 'form'
            },
            {
              name: 'cms',
              id: 'cms'
            },
            {
              name: 'textresources',
              id: 'textresources'
            },
            {
              name: 'menu',
              id: 'menu'
            },
            {
              name: 'acl',
              id: 'acl'
            }
          ]

          test('should fetch user data', () =>
            expectSaga(sagas.fetchData)
              .provide([[matchers.call.fn(rest.simpleRequest), fakeResponse]])
              .put(actions.setData(data))
              .run())
        })

        describe('postData', () => {
          const data = ['forms', 'data', 'reports']
          const resource = '/reloadConfiguration'
          const options = {
            method: 'POST',
            body: data
          }

          test('successful connected', () => {
            const body = {
              success: true
            }
            return expectSaga(sagas.postData, {payload: {data}})
              .provide([[matchers.call(rest.simpleRequest, resource, options), {body}]])
              .call(cache.clearAll)
              .put(actions.setLoading(true))
              .put(externalEvents.fireExternalEvent('onSuccess'))
              .run()
          })

          test('unsuccessfully connected', () => {
            return expectSaga(sagas.postData, {payload: {data}})
              .provide([[matchers.call(rest.simpleRequest, resource, options), throwError(new Error('testException'))]])
              .call(cache.clearAll)
              .put(actions.setLoading(false))
              .run()
          })
        })
      })
    })
  })
})
