import reducer from './reducer'
const EXPECTED_INITIAL_STATE = {}

describe('tocco-util', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })
      })
    })
  })
})
