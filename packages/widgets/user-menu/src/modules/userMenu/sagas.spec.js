import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {login} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('user-menu', () => {
  describe('modules', () => {
    describe('userMenu', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([takeLatest(actions.LOAD_USER, sagas.loadUser), takeLatest(actions.LOGOUT, sagas.logout)])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadUser', () => {
          test('user is logged in ', () => {
            return expectSaga(sagas.loadUser)
              .provide([[matchers.call(login.doRequest, 'username'), {username: 'support@tocco.ch'}]])
              .put(actions.setLoggedIn(true))
              .put(actions.setUsername('support@tocco.ch'))
              .run()
          })

          test('no user is logged in ', () => {
            return expectSaga(sagas.loadUser)
              .provide([[matchers.call(login.doRequest, 'username'), {username: 'anonymous'}]])
              .put(actions.setLoggedIn(false))
              .run()
          })
        })

        describe('logout', () => {
          test('redirect url is defined', () => {
            delete window.location
            window.location = {}

            return expectSaga(sagas.logout)
              .provide([
                [matchers.call(login.doRequest, 'logout', {method: 'POST'}), {}],
                [select(sagas.inputSelector), {logoutRedirectUrl: 'https://tocco.ch'}]
              ])
              .run()
              .then(() => {
                expect(window.location.href).to.eql('https://tocco.ch')
              })
          })

          test('use home page as fallback if no redirect url is defined', () => {
            delete window.location
            window.location = {}

            return expectSaga(sagas.logout)
              .provide([
                [matchers.call(login.doRequest, 'logout', {method: 'POST'}), {}],
                [select(sagas.inputSelector), {}]
              ])
              .run()
              .then(() => {
                expect(window.location.href).to.eql('/')
              })
          })
        })
      })
    })
  })
})
