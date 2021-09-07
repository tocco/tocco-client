import React from 'react'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest, notification} from 'tocco-app-extensions'
import {takeEvery, all} from 'redux-saga/effects'
import {channel} from 'redux-saga'

import * as remoteCreateActions from './actions'
import rootSaga, * as sagas from './sagas'
import * as valueActions from '../values/actions'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('remoteCreate', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should handle remoteCreate', () => {
            const config = {}
            const generator = rootSaga(config)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(remoteCreateActions.OPEN_REMOTE_CREATE, sagas.openRemoteCreate, config)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })

        describe('openRemoteCreate', () => {
          test('should prompt a modal and spawn close saga', () => {
            const DetailApp = () => <div>ListApp</div>
            const formField = {label: 'Person', path: 'relUser', targetEntity: 'User'}
            const formName = 'detailForm'
            const expectedId = 'some-id'
            const expectedDisplay = 'display'

            const action = remoteCreateActions.openRemoteCreate(formField, formName)
            const config = {DetailApp}
            return expectSaga(sagas.openRemoteCreate, config, action)
              .provide([
                [matchers.call.fn(rest.fetchDisplay), expectedDisplay],
                [channel, {}],
                {
                  take() {
                    return {id: expectedId}
                  }
                }
              ])
              .call(rest.fetchDisplay, formField.targetEntity, expectedId)
              .put.actionType(notification.modal().type)
              .put(valueActions.changeFieldValue(formName, formField.path, {key: expectedId, display: expectedDisplay}))
              .run()
          })
        })
      })
    })
  })
})
