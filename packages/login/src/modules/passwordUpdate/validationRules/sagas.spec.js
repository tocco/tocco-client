import {takeLatest, put, select, call, fork, all} from 'redux-saga/effects'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('validationRules', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            it('should fork child sagas', () => {
              const generator = rootSaga()
              expect(generator.next().value).to.deep.equal(all([
                fork(takeLatest, actions.FETCH_VALIDATION_RULES, sagas.fetchValidationRules)
              ]))
              expect(generator.next().done).to.equal(true)
            })
          })

          describe('fetchValidationRules', () => {
            it('should load validation rules', () => {
              const generator = sagas.fetchValidationRules()

              expect(generator.next().value).to.deep.equal(select(sagas.usernameSelector))

              const username = 'user1'

              expect(generator.next(username).value).to.deep.equal(call(sagas.loadValidationRules, username))

              const rules = [{
                name: 'PASSWORD_NOT_CHANGED',
                params: {},
                message: 'Das neue Passwort muss sich vom alten Passwort unterscheiden.'
              }]

              expect(generator.next({rules}).value).to.deep.equal(put(actions.setValidationRules(rules)))

              expect(generator.next(rules).done).to.equal(true)
            })
          })
        })
      })
    })
  })
})
