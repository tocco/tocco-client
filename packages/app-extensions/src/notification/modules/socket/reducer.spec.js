import * as actions from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
  ignoredToasters: []
}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('socket', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
          })

          test('should add ignore toaster', () => {
            const expectedStateAfter = {
              ignoredToasters: ['1']
            }
            const stateAfter = reducer(INITIAL_STATE, actions.addIgnoreToaster('1'))
            expect(stateAfter).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
