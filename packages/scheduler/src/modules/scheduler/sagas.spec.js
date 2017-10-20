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
          it('should load call loadCalendarTypes', () => {
            const saga = testSaga(mainSaga)
            saga.next().all([
              fork(takeLatest, actions.ON_DATE_RANGE_CHANGE, sagas.onDateRangeChange),
              fork(takeLatest, actions.ON_CALENDAT_REMOVE, sagas.onCalendarRemove)
            ])
          })
        })

        describe('onDateRangeChange', () => {
          it('should call externalEvent onDateRangeChange', () => {
            const dateRange = {start: Date.now(), end: Date.now}

            return expectSaga(sagas.onDateRangeChange, actions.onDateRangeChange(dateRange))
              .put(externalEvents.fireExternalEvent('onDateRangeChange', dateRange))
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
    })
  })
})
