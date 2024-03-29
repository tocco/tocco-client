import * as actions from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
  stage: null,
  twoFactorActive: null,
  secret: null,
  username: null,
  setupSuccessful: null
}

describe('sso-login-detail', () => {
  describe('modules', () => {
    describe('reducer', () => {
      test('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
      })

      test('should handle an action', () => {
        const stateBefore = INITIAL_STATE

        const secret = {
          secret: '7ad4b588f0774cf19ac518289c751486',
          totpUri: 'otpauth://totp/Tocco?secret=7ad4b588f0774cf19ac518289c751486'
        }

        const expectedStateAfter = {
          ...INITIAL_STATE,
          secret
        }

        expect(reducer(stateBefore, actions.setSecret(secret))).to.deep.equal(expectedStateAfter)
      })
    })
  })
})
