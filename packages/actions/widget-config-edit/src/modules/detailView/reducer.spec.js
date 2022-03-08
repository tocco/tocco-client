import * as actions from './actions'
import reducer from './index'

const EXPECTED_INITIAL_STATE = {
  specificConfigEntityId: undefined,
  linking: false
}

describe('widget-config-edit', () => {
  describe('modules', () => {
    describe('detailView', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle SET_SPECIFIC_CONFIG_ENTITY_ID', () => {
          const specificConfigEntityId = {
            entityName: 'Login_widget_config',
            key: '56'
          }

          const stateBefore = {
            specificConfigEntityId: undefined
          }

          const expectedState = {
            specificConfigEntityId
          }

          expect(reducer(stateBefore, actions.setSpecificConfigEntityId(specificConfigEntityId))).to.deep.equal(
            expectedState
          )
        })

        test('should handle LINK_CREATED_SPECIFIC_CONFIG', () => {
          const stateBefore = {
            linking: false
          }

          const expectedState = {
            linking: true
          }

          expect(reducer(stateBefore, actions.linkCreatedSpecificConfig())).to.deep.equal(expectedState)
        })

        test('should handle UNSET_LINKING', () => {
          const stateBefore = {
            linking: true
          }

          const expectedState = {
            linking: false
          }

          expect(reducer(stateBefore, actions.unsetLinking())).to.deep.equal(expectedState)
        })
      })
    })
  })
})
