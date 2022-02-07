import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {all, call, select, takeEvery} from 'redux-saga/effects'
import {externalEvents, notification, rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('widget-config-edit', () => {
  describe('modules', () => {
    describe('detailView', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.FETCH_SPECIFIC_CONFIG_ENTITY_ID, sagas.fetchSpecificConfigEntityId),
                takeEvery(actions.LINK_CREATED_SPECIFIC_CONFIG, sagas.linkCreatedSpecificConfig),
                takeEvery(actions.FIRE_SUCCESS, sagas.fireSuccess)
              ])
            )
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('fetchSpecificConfigEntityId', () => {
          test('should fetch specific widget config entity id', () => {
            const response = {body: {entityName: 'Login_widget_config', key: '78'}}
            return expectSaga(sagas.fetchSpecificConfigEntityId)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Widget_config', type: 'ID', ids: ['6']}}],
                [matchers.call.fn(rest.requestSaga), response]
              ])
              .put(actions.setSpecificConfigEntityId(response.body))
              .run()
          })

          test('should throw error when multiple configs are selected', () => {
            return expectSaga(sagas.fetchSpecificConfigEntityId)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Widget_config', type: 'ID', ids: ['6', '8']}}]
              ])
              .put.like({action: notification.toaster({type: 'error'})})
              .run()
          })
        })

        describe('linkCreatedSpecificConfig', () => {
          test('should link specific config entity', () => {
            const specificConfigEntityId = {entityName: 'Login_widget_config', key: '32'}
            const action = actions.linkCreatedSpecificConfig(specificConfigEntityId)
            return expectSaga(sagas.linkCreatedSpecificConfig, action)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Widget_config', type: 'ID', ids: ['6']}}],
                [
                  call(rest.requestSaga, '/widget/configs/6/specific-config', {
                    method: 'PUT',
                    body: specificConfigEntityId
                  })
                ]
              ])
              .call.like(rest.requestSaga)
              .put(actions.fireSuccess())
              .run()
          })

          test('should show error toaster', () => {
            const specificConfigEntityId = {entityName: 'Login_widget_config', key: '32'}
            const action = actions.linkCreatedSpecificConfig(specificConfigEntityId)
            return expectSaga(sagas.linkCreatedSpecificConfig, action)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Widget_config', type: 'ID', ids: ['6']}}],
                [matchers.call.like(rest.requestSaga), throwError(new Error('request failed'))]
              ])
              .put.like({action: notification.toaster({type: 'error'})})
              .run()
          })
        })

        describe('fireSuccess', () => {
          test('should show success toaster and fire success event', () => {
            return expectSaga(sagas.fireSuccess)
              .put.like({action: notification.toaster({type: 'success'})})
              .put(externalEvents.fireExternalEvent('onSuccess'))
              .run()
          })
        })
      })
    })
  })
})
