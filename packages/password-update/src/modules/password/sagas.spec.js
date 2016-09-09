import {put, select, call} from 'redux-saga/effects'
import * as sagas from './sagas'
import * as actions from './actions'
import invokeExternalEvent from '../../utils/ExternalEvents'


describe('password-update', () => {
  describe('password sagas', () => {
    describe('updateNewPassword', () => {
      it('should set new password and trigger validation', () => {
        const generator = sagas.updateNewPassword({
          payload: {
            newPassword: 'newpw'
          }
        })
        expect(generator.next().value).to.deep.equal(put(actions.setNewPassword('newpw')))
        expect(generator.next().value).to.deep.equal(put(actions.validate()))
        expect(generator.next().done).to.equal(true)
      })
    })

    describe('validate', () => {
      it('should validate password locally', () => {
        const generator = sagas.validate()

        expect(generator.next().value).to.deep.equal(select(sagas.validationRulesSelector))

        const rules = [{
          name: 'LENGTH',
          params: {
            max: 2147483647,
            min: 8
          },
          message: 'Das neue Passwort muss mindestens 8 Zeichen lang sein.'
        }]

        expect(generator.next(rules).value).to.deep.equal(select(sagas.passwordSelector))

        const passwordState = {
          oldPassword: 'oldpw',
          newPassword: 'newpw'
        }

        expect(generator.next(passwordState).value).to.deep.equal(
          put(actions.setNewPasswordValidationErrors({
            LENGTH: true
          }))
        )

        expect(generator.next().done).to.equal(true)
      })

      it('should validate password remotely if local validation succeeds (success case)', () => {
        const generator = sagas.validate()

        expect(generator.next().value).to.deep.equal(select(sagas.validationRulesSelector))

        const rules = [{
          name: 'LENGTH',
          params: {
            max: 2147483647,
            min: 8
          },
          message: 'Das neue Passwort muss mindestens 8 Zeichen lang sein.'
        }]

        expect(generator.next(rules).value).to.deep.equal(select(sagas.passwordSelector))

        const passwordState = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(passwordState).value).to.deep.equal(select(sagas.principalPkInputSelector))

        const principalPk = '999'

        expect(generator.next(principalPk).value).to.deep.equal(
          call(sagas.remoteValidate, principalPk, 'oldpw', 'validnewpw')
        )

        const result = {
          valid: true,
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.setNewPasswordValidationErrors({})))

        expect(generator.next().done).to.equal(true)
      })

      it('should validate password remotely if local validation succeeds (failure case)', () => {
        const generator = sagas.validate()

        expect(generator.next().value).to.deep.equal(select(sagas.validationRulesSelector))

        const rules = [{
          name: 'LENGTH',
          params: {
            max: 2147483647,
            min: 8
          },
          message: 'Das neue Passwort muss mindestens 8 Zeichen lang sein.'
        }]

        expect(generator.next(rules).value).to.deep.equal(select(sagas.passwordSelector))

        const passwordState = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(passwordState).value).to.deep.equal(select(sagas.principalPkInputSelector))

        const principalPk = '999'

        expect(generator.next(principalPk).value).to.deep.equal(
          call(sagas.remoteValidate, principalPk, 'oldpw', 'validnewpw')
        )

        const result = {
          valid: false,
          validationMessages: [{
            ruleName: 'DICTIONARY',
            message: 'Das neue Passwort darf das Wort "valid" nicht enthalten'
          }]
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.setNewPasswordValidationErrors({
          DICTIONARY: 'Das neue Passwort darf das Wort "valid" nicht enthalten'
        })))

        expect(generator.next().done).to.equal(true)
      })
    })

    describe('savePassword', () => {
      it('should save password', () => {
        const generator = sagas.savePassword()

        expect(generator.next().value).to.deep.equal(select(sagas.principalPkInputSelector))

        const principalPk = '999'

        expect(generator.next(principalPk).value).to.deep.equal(select(sagas.passwordSelector))

        const password = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(password).value).to.deep.equal(
          call(sagas.storePassword, principalPk, password.oldPassword, password.newPassword)
        )

        const result = {
          error: null
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.savePasswordSuccess()))
        expect(generator.next().value).to.deep.equal(call(invokeExternalEvent, 'close'))

        expect(generator.next(result).done).to.equal(true)
      })

      it('should set validation errors if validation failed', () => {
        const generator = sagas.savePassword()

        expect(generator.next().value).to.deep.equal(select(sagas.principalPkInputSelector))

        const principalPk = '999'

        expect(generator.next(principalPk).value).to.deep.equal(select(sagas.passwordSelector))

        const password = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(password).value).to.deep.equal(
          call(sagas.storePassword, principalPk, password.oldPassword, password.newPassword)
        )

        const validationMessages = [{
          ruleName: 'DICTIONARY',
          message: 'Das neue Passwort darf das Wort "valid" nicht enthalten'
        }]
        const result = {
          error: {
            valid: false,
            validationMessages
          }
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.savePasswordFailure(null, validationMessages)))

        expect(generator.next(result).done).to.equal(true)
      })

      it('should set error code if saving failed', () => {
        const generator = sagas.savePassword()

        expect(generator.next().value).to.deep.equal(select(sagas.principalPkInputSelector))

        const principalPk = '999'

        expect(generator.next(principalPk).value).to.deep.equal(select(sagas.passwordSelector))

        const password = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(password).value).to.deep.equal(
          call(sagas.storePassword, principalPk, password.oldPassword, password.newPassword)
        )

        const result = {
          error: {
            errorCode: 'UNKNOWN_ERROR'
          }
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.savePasswordFailure('UNKNOWN_ERROR')))

        expect(generator.next(result).done).to.equal(true)
      })
    })
  })
})
