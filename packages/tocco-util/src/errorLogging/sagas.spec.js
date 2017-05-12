import rootSaga, * as sagas from './sagas'
import {call, takeEvery, fork, all} from 'redux-saga/effects'
import * as actions from './actions'
import handlerRegistry from './handlerRegistry'

describe('tocco-util', () => {
  describe('errorLogging', () => {
    describe('sagas', () => {
      it('should fork log', () => {
        const handlers = ['console', 'toastr']
        const generator = rootSaga(handlers)

        expect(generator.next().value).to.deep.equal(all([
          fork(takeEvery, actions.LOG_ERROR, sagas.log, handlers)
        ]))

        expect(generator.next().done).to.be.true
      })

      it('should call configured handerls', () => {
        const handlers = ['console', 'toastr']
        const title = 'title'
        const description = 'description'
        const type = 'error'
        const error = new Error('error')
        const gen = sagas.log(handlers, actions.logError(title, description, error))

        expect(gen.next().value).to.eql(call(handlerRegistry['console'], type, title, description, error))
        expect(gen.next().value).to.eql(call(handlerRegistry['toastr'], type, title, description, error))

        expect(gen.next().done).to.be.true
      })
    })
  })
})
