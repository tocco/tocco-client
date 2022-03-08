import reducer from './reducer'
const EXPECTED_INITIAL_STATE = {}

describe('app-extensions', () => {
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
