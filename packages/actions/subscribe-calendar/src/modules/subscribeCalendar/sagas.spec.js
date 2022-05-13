import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {all, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {externalEvents, notification, rest} from 'tocco-app-extensions'
import {js} from 'tocco-util'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('subscribe-calendar', () => {
  describe('modules', () => {
    describe('subscribeCalendar', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.FETCH_CALENDAR_LINK, sagas.fetchCalendarLink),
                takeLatest(actions.COPY_CALENDAR_LINK, sagas.copyCalendarLink)
              ])
            )
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('fetchCalendarLink', () => {
          test('should generate link', () => {
            const entities = [
              {
                paths: {
                  uuid: {
                    value: 'abcdef'
                  }
                }
              }
            ]

            const response = {
              body: {
                baseUrl: 'http://localhost:8080/path'
              }
            }

            return expectSaga(sagas.fetchCalendarLink)
              .provide([
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.requestSaga), response]
              ])
              .put(actions.setCalendarLink('http://localhost:8080/path/abcdef'))
              .run()
          })

          test('should throw error when there is no lecturer calendar', () => {
            const entities = []
            return expectSaga(sagas.fetchCalendarLink)
              .provide([[matchers.call.fn(rest.fetchEntities), entities]])
              .put(
                externalEvents.fireExternalEvent('onError', {
                  title: 'client.actions.subscribe-calendar.toasterTitle',
                  message: 'client.actions.subscribe-calendar.noLecturerCalendar'
                })
              )
              .run()
          })
        })

        describe('copyCalendarLink', () => {
          test('should show success toaster', () => {
            const link = 'http://localhost:8080'
            return expectSaga(sagas.copyCalendarLink)
              .provide([[select(sagas.subscribeCalendarSelector), {link}], [matchers.call.like(js.copyToClipboard)]])
              .put.like({action: notification.toaster({type: 'success'})})
              .run()
          })

          test('should copy link', () => {
            const link = 'http://localhost:8080'
            return expectSaga(sagas.copyCalendarLink)
              .provide([[select(sagas.subscribeCalendarSelector), {link}], [matchers.call(js.copyToClipboard, link)]])
              .put.like({action: notification.toaster({type: 'success'})})
              .run()
          })

          test('should show error toaster', () => {
            const link = 'http://localhost:8080'
            return expectSaga(sagas.copyCalendarLink)
              .provide([
                [select(sagas.subscribeCalendarSelector), {link}],
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
