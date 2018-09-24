import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  showOldPasswordField: true,
  forcedUpdate: false,
  standalone: true,
  username: ''
}

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('dialog', () => {
        describe('reducer', () => {
          test('creates initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
          })

          test('handles SET_SHOW_OLD_PASSWORD', () => {
            const stateBefore = {
              showOldPasswordField: false
            }

            const expectedStateAfter = {
              showOldPasswordField: true
            }

            expect(reducer(stateBefore, actions.setShowOldPasswordField(true))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
