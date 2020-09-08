import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga/effects'

import {requestSaga} from '../rest'
import {fetchServerSettings} from './serverSettings'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('helpers', () => {
      describe('serverSettings', () => {
        describe('fetchServerSettings', () => {
          test('should return settings from server', () => {
            const settings = {runEnv: 'TEST', captchaKey: 'xaho34nLKN'}
            return expectSaga(fetchServerSettings)
              .provide([
                [call(requestSaga, 'client/settings'), {body: settings}]
              ])
              .returns(settings)
              .run()
          })
        })
      })
    })
  })
})
