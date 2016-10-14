import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  message: {},
  loginPending: false
}

describe('action-login/modules/loginForm', () => {
  describe('loginForm reducer', () => {
    it('creates initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
    })

    it('handles SET_MESSAGE (negative)', () => {
      const stateBefore = {
        message: {
          text: '',
          negative: false
        }
      }

      const expectedStateAfter = {
        message: {
          text: 'NEGATIVE MESSAGE',
          negative: true
        }
      }

      expect(reducer(stateBefore, actions.setMessage('NEGATIVE MESSAGE', true))).to.deep.equal(expectedStateAfter)
    })

    it('handles SET_MESSAGE (negative)', () => {
      const stateBefore = {
        message: {
          text: '',
          negative: false
        }
      }

      const expectedStateAfter = {
        message: {
          text: 'POSITIVE MESSAGE',
          negative: false
        }
      }

      expect(reducer(stateBefore, actions.setMessage('POSITIVE MESSAGE', false))).to.deep.equal(expectedStateAfter)
    })

    it('handles SET_PENDING', () => {
      const stateBefore = {
        loginPending: false
      }

      const expectedStateAfter = {
        loginPending: true
      }

      expect(reducer(stateBefore, actions.setPending(true))).to.deep.equal(expectedStateAfter)
    })
  })
})
