import reducer from './reducer'

const INITIAL_STATE = {
  twoFactorActive: null,
  secret: null
}

describe('sso-login-detail', () => {
  describe('modules', () => {
    describe('reducer', () => {
      test('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
      })

      // test('should handle an action', () => {
      //   const stateBefore = INITIAL_STATE
      //   const providers = [{id: 'google'}, {id: 'microsoft'}]
      //   const expectedStateAfter = {
      //     providers
      //   }
      //
      //   expect(reducer(stateBefore, actions.setProviders(providers))).to.deep.equal(expectedStateAfter)
      // })
    })
  })
})
