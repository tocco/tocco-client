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
      it('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
      })

      it('should handle setMergeResponse', () => {
        var expectedStateAfter = {
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
