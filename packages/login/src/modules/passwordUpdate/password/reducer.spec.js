import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
  newPasswordValidationErrors: null,
  passwordUpdateFailed: false,
  passwordUpdatePending: false,
  passwordUpdateErrorCode: null
}

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('password', () => {
        describe('reducer', () => {
          test('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
          })

          test('should handle UPDATE_OLD_PASSWORD', () => {
            const stateBefore = {
              oldPassword: ''
            }

            const expectedStateAfter = {
              oldPassword: 'oldpw'
            }

            expect(reducer(stateBefore, actions.updateOldPassword('oldpw'))).to.deep.equal(expectedStateAfter)
          })

          test('should handle SET_NEW_PASSWORD', () => {
            const stateBefore = {
              newPassword: ''
            }

            const expectedStateAfter = {
              newPassword: 'newpw'
            }

            expect(reducer(stateBefore, actions.setNewPassword('newpw'))).to.deep.equal(expectedStateAfter)
          })

          test('should handle SET_NEW_PASSWORD_VALIDATION_ERRORS', () => {
            const stateBefore = {
              newPasswordValidationErrors: null
            }

            const errors = {
              rule1: true,
              rule3: true
            }
            const expectedStateAfter = {
              newPasswordValidationErrors: errors
            }

            expect(reducer(stateBefore, actions.setNewPasswordValidationErrors(errors))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should handle UPDATE_NEW_PASSWORD_REPEAT', () => {
            const stateBefore = {
              newPasswordRepeat: ''
            }

            const expectedStateAfter = {
              newPasswordRepeat: 'newpwrepeat'
            }

            expect(reducer(stateBefore, actions.updateNewPasswordRepeat('newpwrepeat'))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should handle SAVE_PASSWORD', () => {
            const stateBefore = {
              passwordUpdatePending: false,
              passwordUpdateFailed: true
            }

            const expectedStateAfter = {
              passwordUpdatePending: true,
              passwordUpdateFailed: false
            }

            expect(reducer(stateBefore, actions.savePassword())).to.deep.equal(expectedStateAfter)
          })

          test('should handle SAVE_PASSWORD_SUCCESS', () => {
            const stateBefore = {
              oldPassword: 'old',
              newPassword: 'new',
              newPasswordRepeat: 'new',
              newPasswordValidationErrors: null,
              passwordUpdateFailed: false,
              passwordUpdatePending: true,
              passwordUpdateErrorCode: null
            }

            expect(reducer(stateBefore, actions.savePasswordSuccess())).to.deep.equal(EXPECTED_INITIAL_STATE)
          })

          test('should handle SAVE_PASSWORD_FAILURE with error code', () => {
            const stateBefore = {
              oldPassword: 'old',
              newPassword: 'new',
              newPasswordRepeat: 'new',
              newPasswordValidationErrors: null,
              passwordUpdateFailed: false,
              passwordUpdatePending: true,
              passwordUpdateErrorCode: null
            }

            const expectedStateAfter = {
              oldPassword: 'old',
              newPassword: 'new',
              newPasswordRepeat: 'new',
              newPasswordValidationErrors: null,
              passwordUpdateFailed: true,
              passwordUpdatePending: false,
              passwordUpdateErrorCode: 'MY_ERROR_CODE'
            }

            expect(reducer(stateBefore, actions.savePasswordFailure('MY_ERROR_CODE', null))).to.deep.equal(
              expectedStateAfter
            )
          })

          test('should handle SAVE_PASSWORD_FAILURE with validation messages', () => {
            const stateBefore = {
              oldPassword: 'old',
              newPassword: 'new',
              newPasswordRepeat: 'new',
              newPasswordValidationErrors: null,
              passwordUpdateFailed: false,
              passwordUpdatePending: true,
              passwordUpdateErrorCode: null
            }

            const validationMessages = [
              {ruleName: 'RULE_1', message: 'Rule 1 failed'},
              {ruleName: 'RULE_2', message: 'Rule 2 failed'}
            ]

            const expectedStateAfter = {
              oldPassword: 'old',
              newPassword: 'new',
              newPasswordRepeat: 'new',
              newPasswordValidationErrors: {
                RULE_1: 'Rule 1 failed',
                RULE_2: 'Rule 2 failed'
              },
              passwordUpdateFailed: false,
              passwordUpdatePending: false,
              passwordUpdateErrorCode: null
            }

            expect(reducer(stateBefore, actions.savePasswordFailure(null, validationMessages))).to.deep.equal(
              expectedStateAfter
            )
          })
        })
      })
    })
  })
})
