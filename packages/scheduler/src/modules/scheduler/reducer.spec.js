import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
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
          const calendars = [{name: 'cal1'}, {name: 'cal2'}]

          const expectedStateAfter = {
            calendars
          }

          expect(reducer(EXPECTED_INITIAL_STATE, actions.setCalendars(calendars))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
