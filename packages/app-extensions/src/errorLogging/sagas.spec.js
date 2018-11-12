import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import handlerRegistry from './handlerRegistry'

import {call, takeEvery} from 'redux-saga/effects'

describe('app-extensions', () => {
  describe('errorLogging', () => {
    describe('sagas', () => {
      test('should handle error if accept true', () => {
        const handlers = ['console', 'toastr']
        const accept = true
        const generator = rootSaga(accept, handlers)

        expect(generator.next().value).to.deep.equal(
          takeEvery(actions.LOG_ERROR, sagas.handleError, handlers)
        )

        expect(generator.next().done).to.be.true
      })

      test('should emit error if accept false', () => {
        const handlers = ['console', 'toastr']
        const accept = false
        const generator = rootSaga(accept, handlers)

        expect(generator.next().value).to.deep.equal(
          takeEvery(actions.LOG_ERROR, sagas.emitError)
        )

        expect(generator.next().done).to.be.true
      })

      test('should call configured handerls', () => {
        const handlers = ['console', 'toastr']
        const title = 'title'
        const description = 'description'
        const error = new Error('error')
        const gen = sagas.handleError(handlers, actions.logError(title, description, error))

        expect(gen.next().value).to.eql([
          call(handlerRegistry['console'], title, description, error),
          call(handlerRegistry['toastr'], title, description, error)
        ])

        expect(gen.next().done).to.be.true
      })
    })
  })
})
