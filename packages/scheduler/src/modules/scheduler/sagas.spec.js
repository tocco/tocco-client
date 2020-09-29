import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {externalEvents} from 'tocco-app-extensions'
import {takeLatest} from 'redux-saga/effects'

import mainSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('scheduler', () => {
  describe('modules', () => {
    describe('scheduler', () => {
      describe('sagas', () => {
        describe('mainSaga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(mainSaga)
            saga.next().all([
              takeLatest(actions.ON_DATE_RANGE_CHANGE, sagas.onDateRangeChange),
              takeLatest(actions.ON_CALENDAR_REMOVE, sagas.onCalendarRemove),
              takeLatest(actions.ON_CALENDARS_REMOVE_ALL, sagas.onCalendarRemoveAll),
              takeLatest(actions.ON_EVENT_CLICK, sagas.onEventClick),
              takeLatest(actions.ON_REFRESH, sagas.onRefresh),
              takeLatest(actions.SET_CALENDARS, sagas.setCalendars)
            ])
          })
        })

        describe('onDateRangeChange', () => {
          test('should call externalEvent onDateRangeChange', () => {
            const dateRange = {start: Date.now(), end: Date.now}

            return expectSaga(sagas.onDateRangeChange, actions.onDateRangeChange(dateRange))
              .put(externalEvents.fireExternalEvent('onDateRangeChange', {dateRange}))
              .run()
          })
        })
      })

      describe('onCalendarRemove', () => {
        test('should call externalEvent onCalendarRemove', () => {
          const entityId = '99'
          const entityModel = 'User'

          return expectSaga(sagas.onCalendarRemove, actions.onCalendarRemove(entityId, entityModel))
            .put(externalEvents.fireExternalEvent('onCalendarRemove', {id: entityId, entityModel}))
            .run()
        })
      })

      describe('setCalendars', () => {
        test('should set isLoading to false', () => {
          return expectSaga(sagas.setCalendars)
            .put(actions.setIsLoading(false))
            .run()
        })
      })
    })
  })
})
