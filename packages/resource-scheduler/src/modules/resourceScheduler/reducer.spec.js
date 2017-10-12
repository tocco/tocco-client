import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  calendarTypes: [],
  calendars: []
}

describe('resource-scheduler', () => {
  describe('modules', () => {
    describe('resourceScheduler', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle an action', () => {
          const calendarTypes = [{name: 'lecturer'}]
          const stateBefore = {
            calendarTypes: null
          }

          const expectedStateAfter = {
            calendarTypes: calendarTypes
          }

          expect(reducer(stateBefore, actions.setCalendarTypes(calendarTypes))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
