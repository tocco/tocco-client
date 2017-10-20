import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {fork, select, takeLatest} from 'redux-saga/effects'

import mainSaga, * as sagas from './sagas'

import {requestSaga} from 'tocco-util/src/rest'
import * as actions from './actions'
import fetchMock from 'fetch-mock'

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
          it('should load call loadCalendarTypes', () => {
            const saga = testSaga(mainSaga)
            saga.next().all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.UPDATE_REQUESTED_CALENDARS, sagas.retrieveCalendars),
              fork(takeLatest, actions.SET_DATE_RANGE, sagas.retrieveCalendars),
              fork(takeLatest, actions.REMOVE_REQUESTED_CALENDAR, sagas.retrieveCalendars)
            ])
          })
        })

        describe('initialize', () => {
          it('should load call loadCalendarTypes', () => {
            return expectSaga(sagas.initialize)
              .call(sagas.loadCalendarTypes)
              .run()
          })
        })

        describe('loadCalendarTypes', () => {
          it('should fetch calendar types and dispatch them', () => {
            const calendarTypes = [
              {name: 'Lecturer', targetEntity: 'User'},
              {name: 'Participant', targetEntity: 'User'}
            ]
            const calendarResponse = {body: calendarTypes}

            return expectSaga(sagas.loadCalendarTypes)
              .provide([
                [matchers.call.fn(requestSaga), calendarResponse]
              ])
              .put(actions.setCalendarTypes(calendarTypes))
              .run()
          })
        })
        describe('retrieveCalendars', () => {
          it('should retrieve calendars regading dateRange and request and dispatch them', () => {
            const mockedState = {
              dateRange: {
                startDate: Date.now(),
                endDate: Date.now()
              },
              requestedCalendars: {
                lecturer: ['3', '5']
              }
            }

            const mockCalendars = [{id: '1'}]

            return expectSaga(sagas.retrieveCalendars)
              .provide([
                [select(sagas.resourceSchedulerSelector), mockedState],
                [matchers.call.fn(requestSaga), {body: mockCalendars}]
              ])
              .call(requestSaga, 'calendars',
                {body: {payload: mockedState.requestedCalendars, dateRange: mockedState.dateRange}}
              )
              .put(actions.setCalendars(mockCalendars))
              .run()
          })
        })
      })
    })
  })
})
