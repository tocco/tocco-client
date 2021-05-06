import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  originId: null,
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

          test('should set origin id', () => {
            const expectedStateAfter = {
              originId: 'test',
              ignoredToasters: []
            }
            const stateAfter = reducer(INITIAL_STATE, actions.setOriginId('test'))
            expect(stateAfter).to.deep.equal(expectedStateAfter)
          })

          test('should add ignore toaster', () => {
            const expectedStateAfter = {
              originId: null,
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
