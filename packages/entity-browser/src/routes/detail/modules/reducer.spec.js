import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  formDefinition: {},
  entity: {}
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('detailView', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle an action', () => {
          const stateBefore = {
            entity: ''
          }

          const expectedStateAfter = {
            entity: 'User'
          }

          expect(reducer(stateBefore, actions.setEntity('User'))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
