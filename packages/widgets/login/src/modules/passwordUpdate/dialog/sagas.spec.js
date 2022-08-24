import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeLatest, all} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('dialog', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            test('should fork child sagas', () => {
              const generator = rootSaga()
              expect(generator.next().value).to.deep.equal(
                all([takeLatest(actions.SET_CURRENT_USERNAME, sagas.setCurrentUsername)])
              )
              expect(generator.next().done).to.equal(true)
            })
          })

          describe('setCurrentUsername', () => {
            test('load current user and set username', () => {
              return expectSaga(sagas.setCurrentUsername)
                .provide([
                  [
                    matchers.call.fn(rest.requestSaga, 'principals', {acceptedStatusCodes: [403]}),
                    {body: {username: 'tocco'}}
                  ]
                ])
                .put(actions.setUsernameOrPk('tocco'))
                .run()
            })
          })
        })
      })
    })
  })
})
