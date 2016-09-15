import {put, select, call} from 'redux-saga/effects'
import * as sagas from './sagas'
import * as actions from './actions'

describe('password-update', () => {
  describe('validationRules sagas', () => {
    describe('fetchValidationRules', () => {
      it('should load validation rules', () => {
        const generator = sagas.fetchValidationRules()

        expect(generator.next().value).to.deep.equal(select(sagas.principalPkInputSelector))

        const principalPk = '999'

        expect(generator.next(principalPk).value).to.deep.equal(call(sagas.loadValidationRules, principalPk))

        const rules = [{
          name: "PASSWORD_NOT_CHANGED",
          params: {},
          message: "Das neue Passwort muss sich vom alten Passwort unterscheiden."
        }]

        expect(generator.next({rules}).value).to.deep.equal(put(actions.setValidationRules(rules)))

        expect(generator.next(rules).done).to.equal(true)
      })
    })
  })
})
