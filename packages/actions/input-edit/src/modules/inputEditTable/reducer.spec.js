import * as actions from './actions'
import reducer from './index'

describe('input-edit', () => {
  describe('input-edit-table', () => {
    describe('reducer', () => {
      test('should replace existing values', () => {
        const initialState = {
          some: {other: 'test thing'},
          data: [
            {
              pk: 122,
              node: 'old',
              other: 'old'
            },
            {
              pk: 123,
              node: 'old',
              other: 'old'
            },
            {
              pk: 124,
              node: 'old',
              other: 'old'
            }
          ]
        }

        const expectedState = {
          some: {other: 'test thing'},
          data: [
            {
              pk: 122,
              node: 'old',
              other: 'old'
            },
            {
              pk: 123,
              node: 'new',
              other: 'old'
            },
            {
              pk: 124,
              node: 'old',
              other: 'old'
            }
          ]
        }
        expect(reducer(initialState, actions.setValue(123, 'node', 'new'))).to.deep.equal(expectedState)
      })
    })

    test('should set calculating', () => {
      const inputDataKey = '123'
      const initialState = {
        data: [{pk: inputDataKey}]
      }
      const expectedState = {
        data: [
          {
            pk: inputDataKey,
            loading: true
          }
        ]
      }
      expect(reducer(initialState, actions.setCalculating(inputDataKey, true))).to.deep.equal(expectedState)
    })
    test('should end calculating', () => {
      const inputDataKey = '123'
      const initialState = {
        data: [
          {
            pk: inputDataKey,
            loading: true
          }
        ]
      }
      const expectedState = {
        data: [
          {
            pk: inputDataKey,
            loading: false
          }
        ]
      }
      expect(reducer(initialState, actions.setCalculating(inputDataKey, false))).to.deep.equal(expectedState)
    })
  })
})
