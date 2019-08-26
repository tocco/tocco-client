import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'
import fetchMock from 'fetch-mock'
import {fork, select, takeLatest} from 'redux-saga/effects'

import mainSaga, * as sagas from './sagas'
import * as actions from './actions'
import {transformRequestedCalendars} from '../../utils/rest'

describe('resource-scheduler', () => {
  describe('modules', () => {
    describe('resourceScheduler', () => {
      describe('sagas', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
          fetchMock.get('*', {})
        })

        describe('mainSaga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(mainSaga)
            saga.next().all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.UPDATE_REQUESTED_CALENDARS, sagas.retrieveCalendars),
              fork(takeLatest, actions.SET_DATE_RANGE, sagas.retrieveCalendars),
              fork(takeLatest, actions.REMOVE_REQUESTED_CALENDAR, sagas.retrieveCalendars),
              fork(takeLatest, actions.ON_EVENT_CLICK, sagas.onEventClick),
              fork(takeLatest, actions.ON_REFRESH, sagas.retrieveCalendars)
            ])
          })
        })

        describe('initialize', () => {
          test('should load call loadCalendarTypes', () => {
            return expectSaga(sagas.initialize)
              .call(sagas.loadCalendarTypes)
              .run()
          })
        })

        describe('loadCalendarTypes', () => {
          test('should fetch calendar types and dispatch them', () => {
            const calendarTypes = [
              {name: 'Lecturer', targetEntity: 'User'},
              {name: 'Participant', targetEntity: 'User'}
            ]
            const calendarResponse = {body: {data: calendarTypes}}

            return expectSaga(sagas.loadCalendarTypes)
              .provide([
                [matchers.call.fn(rest.requestSaga), calendarResponse]
              ])
              .put(actions.setCalendarTypes(calendarTypes))
              .run()
          })
        })
        describe('retrieveCalendars', () => {
          test(
            'should retrieve calendars regading dateRange and request and dispatch them',
            () => {
              const mockedState = {
                dateRange: {
                  startDate: new Date(),
                  endDate: new Date()
                },
                requestedCalendars: {
                  lecturer: ['3', '5']
                }
              }

              const mockCalendars = [{id: '1'}]

              return expectSaga(sagas.retrieveCalendars)
                .provide([
                  [select(sagas.resourceSchedulerSelector), mockedState],
                  [matchers.call.fn(transformRequestedCalendars), []],
                  [matchers.call.fn(rest.requestSaga), {body: {data: mockCalendars}}]
                ])
                .call(rest.requestSaga, 'calendar/events',
                  {
                    method: 'POST',
                    body: {
                      calendars: [],
                      start: mockedState.dateRange.startDate.getTime(),
                      end: mockedState.dateRange.endDate.getTime()
                    }
                  }
                )
                .put(actions.setCalendars(mockCalendars))
                .run()
            }
          )
        })
      })
    })
  })
})
