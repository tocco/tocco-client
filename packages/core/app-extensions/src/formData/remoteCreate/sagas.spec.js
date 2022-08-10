import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeEvery, all} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'

import * as valueActions from '../values/actions'
import * as remoteCreateActions from './actions'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('remoteCreate', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should handle remoteCreate', () => {
            const configSelector = () => ({})
            const generator = rootSaga(configSelector)

            expect(generator.next().value).to.deep.equal(
              all([takeEvery(remoteCreateActions.OPEN_REMOTE_CREATE, sagas.openRemoteCreate, configSelector)])
            )

            expect(generator.next().done).to.be.true
          })
        })

        describe('openRemoteCreate', () => {
          const runTest = (dataType, currentValue, expectedId, expectedDisplay, expectedValue) => {
            const DetailApp = () => <div>ListApp</div>
            const formField = {label: 'Person', path: 'relUser', targetEntity: 'User', dataType}
            const formName = 'detailForm'

            const action = remoteCreateActions.openRemoteCreate(formField, formName, currentValue)
            const configSelector = () => ({DetailApp})
            return expectSaga(sagas.openRemoteCreate, configSelector, action)
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
              .put(valueActions.changeFieldValue(formName, formField.path, expectedValue))
              .run()
          }

          test('should prompt a modal and spawn close saga for single-remote-fields', () =>
            runTest(
              'single-remote-field',
              {key: 'old-id', display: 'old display', model: 'User', version: 0},
              'some-id',
              'display',
              {key: 'some-id', display: 'display', model: 'User', version: 0}
            ))

          test('should prompt a modal and spawn close saga for multi-remote-fields', () =>
            runTest(
              'multi-remote-field',
              [{key: 'existing-id', display: 'existing display', model: 'User', version: 0}],
              'some-id',
              'display',
              [
                {key: 'existing-id', display: 'existing display', model: 'User', version: 0},
                {key: 'some-id', display: 'display', model: 'User', version: 0}
              ]
            ))
        })
      })
    })
  })
})
