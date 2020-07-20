import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call} from 'redux-saga/effects'

import {requestSaga} from '../rest'
import {fetchUserPreferences, deleteUserPreferences, savePreferences} from './preferences'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('helpers', () => {
      describe('preferences', () => {
        describe('fetchUserPreferences', () => {
          test('should return preferences from rest endpoint', () => {
            const path = 'User_list'
            const preferences = {'User_list.firstname.position': '5'}
            return expectSaga(fetchUserPreferences, path)
              .provide([
                [call(requestSaga, 'client/preferences/User_list'), {body: {preferences}}]
              ])
              .returns(preferences)
              .run()
          })
        })

        describe('deleteUserPreferences', () => {
          test('should call endpoint', () => {
            const path = 'User_list'
            return expectSaga(deleteUserPreferences, path)
              .provide([
                [matchers.call.fn(requestSaga)]
              ])
              .call.like({fn: requestSaga})
              .run()
          })
        })

        describe('savePreferences', () => {
          test('should call endpoint', () => {
            const preferences = {'User_list.firstname.position': '5'}
            return expectSaga(savePreferences, preferences)
              .provide([
                [matchers.call.fn(requestSaga)]
              ])
              .call.like({fn: requestSaga})
              .run()
          })
        })
      })
    })
  })
})
