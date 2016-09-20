import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = null

describe('password-update', () => {
  describe('validationRules reducer', () => {
    it('creates initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
    });

    it('handles SET_VALIDATION_RULES', () => {
      const rules = [{
        name: "PASSWORD_NOT_CHANGED",
        params: {},
        message: "Das neue Passwort muss sich vom alten Passwort unterscheiden."
      }]

      expect(reducer(EXPECTED_INITIAL_STATE, actions.setValidationRules(rules))).to.deep.equal(rules)
    });
  })
})
