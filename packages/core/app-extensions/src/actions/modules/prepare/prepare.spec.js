import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import confirmHandler from './confirmHandler'
import initialFormHandler from './initialFormHandler'
import largeSelectionHandler from './largeSelectionHandler'
import preCheckHandler from './preCheckHandler'
import prepare, {doRequest, getHandlers} from './prepare'

const definition = {
  endpoint: 'actions/simpleAction'
}

const config = {
  id: 'my-action',
  actionType: 'custom'
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
              params: {},
              selection: fakeSelection
            })
            .run()
        })

        test('should abort with the first abort handler and return abort true', () => {
          const handler1 = sinon.spy(() => ({abort: false}))
          const handler2 = sinon.spy(() => ({abort: true}))
          const handler3 = sinon.spy()
          const fakeHandlers = [handler1, handler2, handler3]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: true,
              abortMessage: null,
              params: {},
              selection: fakeSelection
            })
            .run()
            .then(() => {
              expect(handler1).to.have.been.called
              expect(handler2).to.have.been.called
              expect(handler3).to.not.have.been.called
            })
        })

        test('should invoke handlers with handler options', () => {
          const handler1 = sinon.spy(() => ({abort: false}))
          const fakeHandlers = [handler1]

          const preparationResponse = {foo: 'bar'}

          return expectSaga(prepare, definition, fakeSelection, null, config)
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), preparationResponse]
            ])
            .run()
            .then(() => {
              expect(handler1).to.have.been.calledWith({
                preparationResponse,
                params: {},
                definition,
                selection: fakeSelection,
                config
              })
            })
        })

        test('should build params', () => {
          const handler1 = sinon.spy(() => ({abort: false, params: {test: 1}}))
          const handler2 = sinon.spy(() => ({abort: false}))
          const handler3 = sinon.spy(() => ({abort: false, params: {test2: 2}}))
          const fakeHandlers = [handler1, handler2, handler3]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: false,
              abortMessage: null,
              params: {test: 1, test2: 2},
              selection: fakeSelection
            })
            .run()
        })

        test('should return abort message ', () => {
          const fakeHandlers = [() => ({abort: true, abortMessage: 'test'})]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: true,
              abortMessage: 'test',
              params: {},
              selection: fakeSelection
            })
            .run()
        })

        test('should pass new selection to the subsequent handlers and return the new selection', () => {
          const newSelection = {
            count: 3,
            entityName: 'User',
            ids: ['1', '2', '3'],
            type: 'ID'
          }
          const handlerArgs = {
            preparationResponse: {},
            params: {},
            definition: {endpoint: 'actions/simpleAction'},
            selection: fakeSelection,
            config: {}
          }

          const handler1 = sinon.spy(() => ({abort: false}))
          const handler2 = sinon.spy(() => ({abort: false, selection: newSelection}))
          const handler3 = sinon.spy(() => ({abort: false}))

          const fakeHandlers = [handler1, handler2, handler3]

          return expectSaga(prepare, definition, fakeSelection, null, {})
            .provide([
              [matchers.call.fn(getHandlers), fakeHandlers],
              [matchers.call.fn(doRequest), {}]
            ])
            .returns({
              abort: false,
              abortMessage: null,
              params: {},
              selection: newSelection
            })
            .run()
            .then(() => {
              expect(handler1).to.have.been.calledWith(handlerArgs)
              expect(handler2).to.have.been.calledWith(handlerArgs)
              expect(handler3).to.have.been.calledWith({
                ...handlerArgs,
                selection: newSelection
              })
            })
        })
      })

      describe('getHandlers', () => {
        test('should return standard handlers', () => {
          const handlers = getHandlers({})

          expect(handlers.length).to.eql(4)
          expect(handlers).to.eql([largeSelectionHandler, preCheckHandler, confirmHandler, initialFormHandler])
        })

        test('should return custom handlers', () => {
          const customHandler = () => {}
          const handlers = getHandlers({customPreparationHandlers: [customHandler]})

          expect(handlers.length).to.eql(5)
          expect(handlers[4]).to.eql(customHandler)
        })
      })
    })
  })
})
