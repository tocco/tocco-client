import reducer from './reducer'

const INITIAL_STATE = {
  relationEntities: {}
}

describe('simple-form', () => {
  describe('modules', () => {
    describe('simpleForm', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })
      })
    })
  })
})
