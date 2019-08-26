import {externalEvents} from 'tocco-app-extensions'
import {takeLatest, put, select, call, fork, all} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import {setPassword} from '../../login/actions'
import {loginSaga} from '../../sagas'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('password', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            test('should fork child sagas', () => {
              const generator = rootSaga()
              expect(generator.next().value).to.deep.equal(all([
                fork(takeLatest, actions.UPDATE_NEW_PASSWORD, sagas.updateNewPassword),
                fork(takeLatest, actions.VALIDATE, sagas.validate),
                fork(takeLatest, actions.SAVE_PASSWORD, sagas.savePassword),
                fork(takeLatest, actions.UPDATE_NEW_PASSWORD, sagas.formChanged),
                fork(takeLatest, actions.UPDATE_OLD_PASSWORD, sagas.formChanged),
                fork(takeLatest, actions.UPDATE_NEW_PASSWORD_REPEAT, sagas.formChanged)
              ]))
              expect(generator.next().done).to.equal(true)
            })
          })

          describe('updateNewPassword', () => {
            test('should set new password and trigger validation', () => {
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
            test('should validate password locally', () => {
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

            test(
              'should validate password remotely if local validation succeeds (success case)',
              () => {
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

                expect(generator.next(passwordState).value).to.deep.equal(select(sagas.usernameSelector))

                const username = 'user1'

                expect(generator.next(username).value).to.deep.equal(call(sagas.getData))

                const data = {
                  oldPassword: 'oldpw',
                  newPassword: 'validnewpw'
                }

                expect(generator.next(data).value).to.deep.equal(call(sagas.remoteValidate, username, data))

                const result = {
                  valid: true
                }

                expect(generator.next(result).value).to.deep.equal(put(actions.setNewPasswordValidationErrors({})))

                expect(generator.next().done).to.equal(true)
              }
            )

            test(
              'should validate password remotely if local validation succeeds (failure case)',
              () => {
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

                expect(generator.next(passwordState).value).to.deep.equal(select(sagas.usernameSelector))

                const username = 'user1'

                expect(generator.next(username).value).to.deep.equal(call(sagas.getData))

                const data = {
                  oldPassword: 'oldpw',
                  newPassword: 'validnewpw'
                }

                expect(generator.next(data).value).to.deep.equal(call(sagas.remoteValidate, username, data))

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
              }
            )
          })

          describe('savePassword', () => {
            test('should call external event on standalone mode', () => {
              const generator = sagas.savePassword()

              expect(generator.next().value).to.deep.equal(select(sagas.usernameSelector))

              const username = 'user1'

              expect(generator.next(username).value).to.deep.equal(call(sagas.getData))

              const data = {
                oldPassword: 'oldpw',
                newPassword: 'validnewpw'
              }

              expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, username, data))

              const result = {
                error: null
              }

              expect(generator.next(result).value).to.deep.equal(select(sagas.standaloneSelector))

              const standalone = true

              expect(generator.next(standalone).value).to.deep.equal(
                put(externalEvents.fireExternalEvent('success', {newPassword: 'validnewpw'}))
              )
              expect(generator.next().value).to.deep.equal(put(actions.savePasswordSuccess()))

              expect(generator.next(result).done).to.equal(true)
            })

            test('should call login saga if not standalone', () => {
              const generator = sagas.savePassword()

              expect(generator.next().value).to.deep.equal(select(sagas.usernameSelector))

              const username = 'user1'

              expect(generator.next(username).value).to.deep.equal(call(sagas.getData))

              const data = {
                oldPassword: 'oldpw',
                newPassword: 'validnewpw'
              }

              expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, username, data))

              const result = {
                error: null
              }

              expect(generator.next(result).value).to.deep.equal(select(sagas.standaloneSelector))

              const standalone = false

              expect(generator.next(standalone).value).to.deep.equal(call(sagas.getLoginData))
              const loginData = {payload: {username: 'user1', password: '123'}}

              expect(generator.next(loginData).value).to.deep.equal(put(setPassword('123')))
              expect(generator.next().value).to.deep.equal(call(loginSaga, loginData))

              expect(generator.next().value).to.deep.equal(put(actions.savePasswordSuccess()))
              expect(generator.next(result).done).to.be.true
            })

            test('should set validation errors if validation failed', () => {
              const generator = sagas.savePassword()

              expect(generator.next().value).to.deep.equal(select(sagas.usernameSelector))

              const username = 'user1'

              expect(generator.next(username).value).to.deep.equal(call(sagas.getData))

              const data = {
                oldPassword: 'oldpw',
                newPassword: 'validnewpw'
              }

              expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, username, data))

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

              expect(generator.next(result).value).to.deep.equal(
                put(actions.savePasswordFailure(null, validationMessages))
              )

              expect(generator.next(result).done).to.equal(true)
            })

            test('should set error code if saving failed', () => {
              const generator = sagas.savePassword()

              expect(generator.next().value).to.deep.equal(select(sagas.usernameSelector))

              const username = 'user1'

              expect(generator.next(username).value).to.deep.equal(call(sagas.getData))

              const data = {
                oldPassword: 'oldpw',
                newPassword: 'validnewpw'
              }

              expect(generator.next(data).value).to.deep.equal(call(sagas.storePassword, username, data))

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
            test('should return from input if available', () => {
              const generator = sagas.getData()

              expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

              const input = {
                oldPassword: 'input-oldpassword'
              }

              expect(generator.next(input).value).to.deep.equal(select(sagas.passwordSelector))

              const password = {
                oldPassword: 'password-oldpassword',
                newPassword: 'password-newpassword'
              }

              expect(generator.next(password).value).to.deep.equal({
                oldPassword: 'input-oldpassword',
                newPassword: 'password-newpassword'
              })

              expect(generator.next().done).to.equal(true)
            })

            test('should return from password state if input not available', () => {
              const generator = sagas.getData()

              expect(generator.next().value).to.deep.equal(select(sagas.inputSelector))

              const input = {}

              expect(generator.next(input).value).to.deep.equal(select(sagas.passwordSelector))

              const password = {
                oldPassword: 'password-oldpassword',
                newPassword: 'password-newpassword'
              }

              expect(generator.next(password).value).to.deep.equal({
                oldPassword: 'password-oldpassword',
                newPassword: 'password-newpassword'
              })

              expect(generator.next().done).to.equal(true)
            })
          })

          describe('formChanged', () => {
            test('should reset error state on change', () => {
              const generator = sagas.formChanged()
              expect(generator.next().value).to.deep.equal(put(actions.resetPasswordUpdateFailed()))
              expect(generator.next().done).to.equal(true)
            })
          })
        })
      })
    })
  })
})
