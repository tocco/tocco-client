import * as actions from './actions'
import reducer from './index'

const EXPECTED_INITIAL_STATE = {
  formDefinition: {},
  entity: {},
  entityModel: {},
  touched: false,
  fieldDefinitions: [],
  marked: false
}

describe('entity-detail', () => {
  describe('modules', () => {
    describe('entityDetail', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle an action', () => {
          const stateBefore = {
            entity: ''
          }

          const expectedStateAfter = {
            entity: 'User'
          }

          expect(reducer(stateBefore, actions.setEntity('User'))).to.deep.equal(expectedStateAfter)
        })

        describe('SET_TOUCHED', () => {
          test('should handle SET_TOUCHED', () => {
            const stateBefore = {
              otherProp: 'foo',
              touched: false
            }

            const expectedStateAfter = {
              otherProp: 'foo',
              touched: true
            }
            expect(reducer(stateBefore, actions.setTouched(true))).to.deep.equal(expectedStateAfter)
          })
        })

        describe('SET_MARKED', () => {
          test('should handle SET_MARKED', () => {
            expect(
              reducer(
                {
                  marked: false
                },
                actions.setMarked(true)
              )
            ).to.deep.equal({
              marked: true
            })
          })
        })
      })
    })
  })
})
