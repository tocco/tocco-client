import reducer from './index'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formBase: '',
  appId: ''
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })
      })
    })
  })
})
