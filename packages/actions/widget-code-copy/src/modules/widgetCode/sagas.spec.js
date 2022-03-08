import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {all, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {notification, rest} from 'tocco-app-extensions'
import {js} from 'tocco-util'

import {generateWidgetCode} from '../../utils/widgetCode'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('widget-code-copy', () => {
  describe('modules', () => {
    describe('widgetCode', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.FETCH_WIDGET_CONFIG, sagas.fetchWidgetConfig),
                takeLatest(actions.COPY_WIDGET_CODE, sagas.copyWidgetCode)
              ])
            )
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('fetchWidgetConfig', () => {
          test('should fetch widget config', () => {
            const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}
            return expectSaga(sagas.fetchWidgetConfig)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Widget_config', type: 'ID', ids: ['6']}}],
                [matchers.call.fn(rest.fetchEntity), widgetConfig]
              ])
              .put(actions.setWidgetConfig(widgetConfig))
              .run()
          })

          test('should throw error when multiple configs are selected', () => {
            return expectSaga(sagas.fetchWidgetConfig)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Widget_config', type: 'ID', ids: ['6', '8']}}]
              ])
              .put.like({action: notification.toaster({type: 'error'})})
              .run()
          })

          test('should throw error when a wrong entity is selected', () => {
            return expectSaga(sagas.fetchWidgetConfig)
              .provide([[select(sagas.inputSelector), {selection: {entityName: 'User', type: 'ID', ids: ['6']}}]])
              .put.like({action: notification.toaster({type: 'error'})})
              .run()
          })
        })

        describe('copyWidgetCode', () => {
          test('should show success toaster', () => {
            const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}
            return expectSaga(sagas.copyWidgetCode)
              .provide([[select(sagas.widgetCodeSelector), {widgetConfig}], [matchers.call.like(js.copyToClipboard)]])
              .put.like({action: notification.toaster({type: 'success'})})
              .run()
          })

          test('should generate widget code', () => {
            const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}
            const widgetCode = generateWidgetCode(widgetConfig)
            return expectSaga(sagas.copyWidgetCode)
              .provide([
                [select(sagas.widgetCodeSelector), {widgetConfig}],
                [matchers.call(js.copyToClipboard, widgetCode)]
              ])
              .put.like({action: notification.toaster({type: 'success'})})
              .run()
          })

          test('should show error toaster', () => {
            const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}
            return expectSaga(sagas.copyWidgetCode)
              .provide([
                [select(sagas.widgetCodeSelector), {widgetConfig}],
                [matchers.call.like(js.copyToClipboard), throwError(new Error('copy failed'))]
              ])
              .put.like({action: notification.toaster({type: 'error'})})
              .run()
          })
        })
      })
    })
  })
})
