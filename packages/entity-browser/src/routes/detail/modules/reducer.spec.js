import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  formDefinition: {},
  entity: {},
  selectBoxStores: {}
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

        it('should handle the SET_STORE action', () => {
          const stateBefore = {
            selectBoxStores: {
              entity1: {
                loaded: true,
                data: []
              }
            }
          }

          const newStore = [
            {label: 'label1', value: '1'},
            {label: 'label2', value: '2'}
          ]

          const expectedStateAfter = {
            selectBoxStores: {
              entity1: {
                loaded: true,
                data: []
              },
              entity2: {
                loaded: false,
                data: newStore
              }
            }
          }

          expect(reducer(stateBefore, actions.setStore('entity2', newStore))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
