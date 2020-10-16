import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import prepare, {doRequest, getHandlers} from './prepare'

const definition = {
  endpoint: 'actions/simpleAction'
}

const fakeSelection = {
  count: 2,
  entityName: 'User',
  ids: ['1', '2'],
  type: 'ID'
}

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('prepare', () => {
        test('should not abort if no endpoint is set', () => {
          return expectSaga(prepare, {endpoint: null}, fakeSelection, null, {})
            .returns({
              abort: false,
              abortMessage: null,
              params: {}
            })
            .run()
        })

        test('should abort with the first abord handler and return abort false', () => {
          const spy1 = sinon.spy(() => ({abort: false}))
          const spy2 = sinon.spy()
          const fakeHandlers = [
            spy1,
            () => ({abort: true}),
            spy2
          ]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: true,
              abortMessage: null,
              params: {}
            })
            .run()
            .then(() => {
              expect(spy1).to.have.been.called
              expect(spy2).to.not.have.been.called
            })
        })

        test('should build params', () => {
          const fakeHandlers = [
            () => ({abort: false, params: {test: 1}}),
            () => ({abort: false, params: {test2: 2}})
          ]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: false,
              abortMessage: null,
              params: {test: 1, test2: 2}
            })
            .run()
        })

        test('should return abort message ', () => {
          const fakeHandlers = [
            () => ({abort: true, abortMessage: 'test'})
          ]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: true,
              abortMessage: 'test',
              params: {}
            })
            .run()
        })
      })
    })
  })
})
