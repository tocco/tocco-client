import reducer from './index'
import {setMergeResponse} from './actions'

const EXPECTED_INITIAL_STATE = {
  mergeResponse: {
    merged: false
  }
}

describe('merge', () => {
  describe('module wizard', () => {
    describe('reducer', () => {
      test('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
      })

      test('should handle setMergeResponse', () => {
        const expectedStateAfter = {
          mergeResponse: {
            merged: true,
            xyz: 'asd'
          }
        }
        expect(reducer(EXPECTED_INITIAL_STATE, setMergeResponse({xyz: 'asd'}))).to.deep.equal(expectedStateAfter)
      })
    })
  })
})
