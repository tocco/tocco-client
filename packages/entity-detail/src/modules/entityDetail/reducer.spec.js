import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  appId: '',
  formDefinition: {},
  entity: {},
  entityModel: {},
  entityName: '',
  formName: '',
  mode: 'update',
  touched: false,
  showSubGridCreateButton: false,
  defaultValues: {}
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
      })
    })
  })
})
