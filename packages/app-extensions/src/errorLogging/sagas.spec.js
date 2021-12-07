import {call, takeEvery, all} from 'redux-saga/effects'

import * as actions from './actions'
import handlerRegistry from './handlerRegistry'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('errorLogging', () => {
    describe('sagas', () => {
      test('should handle error if accept true', () => {
        const handlers = ['console', 'notification']
        const accept = true
        const generator = rootSaga(accept, handlers)

        expect(generator.next().value).to.deep.equal(takeEvery(actions.LOG_ERROR, sagas.handleError, handlers))

        expect(generator.next().done).to.be.true
      })

      test('should emit error if accept false', () => {
        const handlers = ['console', 'notification']
        const accept = false
        const generator = rootSaga(accept, handlers)

        expect(generator.next().value).to.deep.equal(takeEvery(actions.LOG_ERROR, sagas.emitError))

        expect(generator.next().done).to.be.true
      })

      test('should call configured handlers', () => {
        const handlers = ['console', 'notification']
        const title = 'title'
        const description = 'description'
        const error = new Error('error')
        const gen = sagas.handleError(handlers, actions.logError(title, description, error))

        expect(gen.next().value).to.eql(
          all([
            call(handlerRegistry.console, title, description, error),
            call(handlerRegistry.notification, title, description, error)
          ])
        )

        expect(gen.next().done).to.be.true
      })
    })
  })
})
