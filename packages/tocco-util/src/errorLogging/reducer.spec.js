import reducer from './index'
import * as actions from './actions'

const INITIAL_STATE = {
  messages: []
}

describe('tocco-util', () => {
  describe('errorLogging', () => {
    describe('reducer', () => {
      it('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
      })

      it('should add messages to list', () => {
        const title = 'title'
        const description = 'description'
        const error = new Error('error')

        let stateAfter = reducer(INITIAL_STATE, actions.logError(title, description, error))
        expect(stateAfter).to.have.property('messages')
        expect(stateAfter.messages).to.have.length(1)

        stateAfter = reducer(stateAfter, actions.logError(title, description, error))
        expect(stateAfter.messages).to.have.length(2)
      })

      it('should only store the latest messages', () => {
        const MAX_LOGGED_ERRORS_MESSAGE = 100
        const title = 'title'
        const description = 'description'
        const error = new Error('error')
        let stateAfter = INITIAL_STATE

        for (let i = 0; i < 120; i += 1) {
          stateAfter = reducer(stateAfter, actions.logError(title, description, error))
        }

        expect(stateAfter.messages).to.have.length(MAX_LOGGED_ERRORS_MESSAGE)
      })
    })
  })
})
