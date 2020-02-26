import {takeLatest, put, select, call, all} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('validationRules', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            test('should fork child sagas', () => {
              const generator = rootSaga()
              expect(generator.next().value).to.deep.equal(all([
                takeLatest(actions.FETCH_VALIDATION_RULES, sagas.fetchValidationRules)
              ]))
              expect(generator.next().done).to.equal(true)
            })
          })

          describe('fetchValidationRules', () => {
            test('should load validation rules', () => {
              const locale = 'de-CH'
              const username = 'user1'

              const generator = sagas.fetchValidationRules()

              expect(generator.next().value).to.deep.equal(select(sagas.usernameSelector))
              expect(generator.next(username).value).to.deep.equal(select(sagas.intlSelector))
              expect(generator.next({locale}).value).to.deep.equal(call(sagas.loadValidationRules, username, locale))

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
