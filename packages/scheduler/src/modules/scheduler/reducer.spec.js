import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  calendars: [],
  isLoading: true
}

describe('resource-scheduler', () => {
  describe('modules', () => {
    describe('resourceScheduler', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle an action', () => {
          const calendars = [{name: 'cal1'}, {name: 'cal2'}]

          const expectedStateAfter = {
            calendars,
            isLoading: true
          }

          expect(reducer(EXPECTED_INITIAL_STATE, actions.setCalendars(calendars))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
