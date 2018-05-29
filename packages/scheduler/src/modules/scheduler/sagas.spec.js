import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {fork, takeLatest} from 'redux-saga/effects'
import {externalEvents} from 'tocco-util'
import mainSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('scheduler', () => {
  describe('modules', () => {
    describe('scheduler', () => {
      describe('sagas', () => {
        describe('mainSaga', () => {
          it('should fork sagas', () => {
            const saga = testSaga(mainSaga)
            saga.next().all([
              fork(takeLatest, actions.ON_DATE_RANGE_CHANGE, sagas.onDateRangeChange),
              fork(takeLatest, actions.ON_CALENDAR_REMOVE, sagas.onCalendarRemove),
              fork(takeLatest, actions.ON_EVENT_CLICK, sagas.onEventClick),
              fork(takeLatest, actions.ON_REFRESH, sagas.onRefresh),
              fork(takeLatest, actions.SET_CALENDARS, sagas.setCalendars)
            ])
          })
        })

        describe('onDateRangeChange', () => {
          it('should call externalEvent onDateRangeChange', () => {
            const dateRange = {start: Date.now(), end: Date.now}

            return expectSaga(sagas.onDateRangeChange, actions.onDateRangeChange(dateRange))
              .put(externalEvents.fireExternalEvent('onDateRangeChange', {dateRange}))
              .run()
          })
        })
      })

      describe('onCalendarRemove', () => {
        it('should call externalEvent onCalendarRemove', () => {
          const entityId = '99'
          const calendarType = 'lecturer'

          return expectSaga(sagas.onCalendarRemove, actions.onCalendarRemove(entityId, calendarType))
            .put(externalEvents.fireExternalEvent('onCalendarRemove', {id: entityId, calendarType}))
            .run()
        })
      })

      describe('setCalendars', () => {
        it('should set isLoading to false', () => {
          return expectSaga(sagas.setCalendars)
            .put(actions.setIsLoading(false))
            .run()
        })
      })
    })
  })
})
