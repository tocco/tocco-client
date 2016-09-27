import {put, select, call} from 'redux-saga/effects'
import * as sagas from './sagas'
import * as actions from './actions'
import {ExternalEvents} from 'tocco-util'


describe('action-password-update', () => {
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

        expect(generator.next(passwordState).value).to.deep.equal(select(sagas.inputSelector))

        const input = {
          principalPk: '999'
        }

        expect(generator.next(input).value).to.deep.equal(call(sagas.getData))

        const data = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(data).value).to.deep.equal(call(sagas.remoteValidate, input.principalPk, data))

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

        expect(generator.next(passwordState).value).to.deep.equal(select(sagas.inputSelector))

        const input = {
          principalPk: '999'
        }

        expect(generator.next(input).value).to.deep.equal(call(sagas.getData))

        const data = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(data).value).to.deep.equal(call(sagas.remoteValidate, input.principalPk, data))

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

        expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

        const input = {
          principalPk: '999'
        }

        expect(generator.next(input).value).to.deep.equal(call(sagas.getData))

        const data = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, input.principalPk, data))

        const result = {
          error: null
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.savePasswordSuccess()))
        expect(generator.next().value).to.deep.equal(call(ExternalEvents.invokeExternalEvent, 'success'))

        expect(generator.next(result).done).to.equal(true)
      })

      it('should set validation errors if validation failed', () => {
        const generator = sagas.savePassword()

        expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

        const input = {
          principalPk: '999'
        }

        expect(generator.next(input).value).to.deep.equal(call(sagas.getData))

        const data = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, input.principalPk, data))

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

        expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

        const input = {
          principalPk: '999'
        }

        expect(generator.next(input).value).to.deep.equal(call(sagas.getData))

        const data = {
          oldPassword: 'oldpw',
          newPassword: 'validnewpw'
        }

        expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, input.principalPk, data))

        const result = {
          error: {
            errorCode: 'UNKNOWN_ERROR'
          }
        }

        expect(generator.next(result).value).to.deep.equal(put(actions.savePasswordFailure('UNKNOWN_ERROR')))

        expect(generator.next(result).done).to.equal(true)
      })
    })

    describe('getData', () => {
      it('should return from input if available', () => {
        const generator = sagas.getData()

        expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

        const input = {
          username: 'input-username',
          oldPassword: 'input-oldpassword'
        }

        expect(generator.next(input).value).to.deep.equal(select(sagas.passwordSelector))

        const password = {
          username: 'password-username',
          oldPassword: 'password-oldpassword',
          newPassword: 'password-newpassword'
        }

        expect(generator.next(password).value).to.deep.equal({
          username:'input-username',
          oldPassword: 'input-oldpassword',
          newPassword: 'password-newpassword'
        })

        expect(generator.next().done).to.equal(true)
      })

      it('should return from password state if input not available', () => {
        const generator = sagas.getData()

        expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

        const input = {}

        expect(generator.next(input).value).to.deep.equal(select(sagas.passwordSelector))

        const password = {
          oldPassword: 'password-oldpassword',
          newPassword: 'password-newpassword'
        }

        expect(generator.next(password).value).to.deep.equal({
          username: undefined,
          oldPassword: 'password-oldpassword',
          newPassword: 'password-newpassword'
        })

        expect(generator.next().done).to.equal(true)
      })
    })
  })
})
