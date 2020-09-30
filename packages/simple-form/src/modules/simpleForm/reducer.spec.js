import reducer from './reducer'

const INITIAL_STATE = {
  fieldDefinitions: null
}

describe('simple-form', () => {
  describe('modules', () => {
    describe('simpleForm', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })
      })
    })
  })
})
