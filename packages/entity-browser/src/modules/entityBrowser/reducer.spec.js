import reducer from './reducer'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formBase: '',
  appId: '',
  scrollBehaviour: 'none'
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })
      })
    })
  })
})
