import reducer from './index'
import * as actions from './actions'

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

describe('input-edit', () => {
  describe('input-edit-table', () => {
    describe('reducer', () => {
      test('should replace existing values', () => {
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
  })
})
