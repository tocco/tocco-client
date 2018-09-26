import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  calendarTypes: [],
  requestedCalendars: {},
  calendars: [],
  dateRange: {}
}

describe('resource-scheduler', () => {
  describe('modules', () => {
    describe('resourceScheduler', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle an action', () => {
          const calendarTypes = [{name: 'lecturer'}]
          const stateBefore = {
            calendarTypes: null
          }

          const expectedStateAfter = {
            calendarTypes: calendarTypes
          }

          expect(reducer(stateBefore, actions.setCalendarTypes(calendarTypes))).to.deep.equal(expectedStateAfter)
        })

        describe('removeRequestedCalendar', () => {
          test('should remove key from array', () => {
            const stateBefore = {
              requestedCalendars: {
                lecturer: ['1', '3', '4', '5']
              }
            }

            const expectedStateAfter = {
              requestedCalendars: {
                lecturer: ['1', '4', '5']
              }
            }

            expect(reducer(stateBefore, actions.removeRequestedCalendar('lecturer', '3')))
              .to.deep.equal(expectedStateAfter)
          })

          test('should remove property if keys are empty', () => {
            const stateBefore = {
              requestedCalendars: {
                lecturer: ['3']
              }
            }

            const expectedStateAfter = {
              requestedCalendars: {}
            }

            expect(reducer(stateBefore, actions.removeRequestedCalendar('lecturer', '3')))
              .to.deep.equal(expectedStateAfter)
          })
        })

        describe('updateRequestedCalendars', () => {
          test('should update the whole entry', () => {
            const stateBefore = {
              requestedCalendars: {
                xy: ['2'],
                lecturer: ['1', '3']
              }
            }

            const expectedStateAfter = {
              requestedCalendars: {
                xy: ['2'],
                lecturer: ['2', '7']
              }
            }

            expect(reducer(stateBefore, actions.updateRequestedCalendars('lecturer', ['2', '7'])))
              .to.deep.equal(expectedStateAfter)
          })

          test('should remove property if keys are empty', () => {
            const stateBefore = {
              requestedCalendars: {
                xy: ['2'],
                lecturer: ['1', '3']
              }
            }

            const expectedStateAfter = {
              requestedCalendars: {
                xy: ['2']
              }
            }

            expect(reducer(stateBefore, actions.updateRequestedCalendars('lecturer', [])))
              .to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
