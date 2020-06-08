import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  data: undefined
}

describe('user-qr-action', () => {
  describe('modules', () => {
    describe('reducer', () => {
      test('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
      })

      test('should handle SET_DATA action', () => {
        const stateBefore = INITIAL_STATE

        const data = {
          firstname: 'Max',
          lastname: 'Muster'
        }

        const expectedStateAfter = {
          ...INITIAL_STATE,
          data
        }

        expect(reducer(stateBefore, actions.setData(data))).to.deep.equal(expectedStateAfter)
      })
    })
  })
})
