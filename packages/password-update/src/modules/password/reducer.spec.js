import reducer from './index'
import * as actions from './actions'

describe('password-update', () => {
  describe('password reducer', () => {
    it('creates initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        newPasswordValidationErrors: null,
        passwordUpdateFailed: false,
        passwordUpdatePending: false
      })
    });

    it('handles UPDATE_OLD_PASSWORD', () => {
      const stateBefore = {
        oldPassword: ''
      }

      const expectedStateAfter = {
        oldPassword: 'oldpw'
      }

      expect(reducer(stateBefore, actions.updateOldPassword('oldpw'))).to.deep.equal(expectedStateAfter)
    });

    it('handles SET_NEW_PASSWORD', () => {
      const stateBefore = {
        newPassword: ''
      }

      const expectedStateAfter = {
        newPassword: 'newpw'
      }

      expect(reducer(stateBefore, actions.setNewPassword('newpw'))).to.deep.equal(expectedStateAfter)
    });

    it('handles SET_NEW_PASSWORD_VALIDATION_ERRORS', () => {
      const stateBefore = {
        newPasswordValidationErrors: null
      }

      const errors = {
        'rule1': true,
        'rule3': true
      }
      const expectedStateAfter = {
        newPasswordValidationErrors: errors
      }

      expect(reducer(stateBefore, actions.setNewPasswordValidationErrors(errors))).to.deep.equal(expectedStateAfter)
    });

    it('handles UPDATE_NEW_PASSWORD_REPEAT', () => {
      const stateBefore = {
        newPasswordRepeat: ''
      }

      const expectedStateAfter = {
        newPasswordRepeat: 'newpwrepeat'
      }

      expect(reducer(stateBefore, actions.updateNewPasswordRepeat('newpwrepeat'))).to.deep.equal(expectedStateAfter)
    });
  })
})
