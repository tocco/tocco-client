import * as actions from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
  dialog: {
    instanceCount: 0,
    directory: false,
    onSuccess: null,
    onError: null
  }
}

describe('docs-browser', () => {
  describe('modules', () => {
    describe('create', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })

        test('should handle OPEN_DIALOG action', () => {
          const onSuccess = () => {}
          const onError = () => {}

          const expectedStateAfter = {
            ...INITIAL_STATE,
            dialog: {
              instanceCount: 1,
              directory: true,
              onSuccess,
              onError
            }
          }

          const action = actions.openDialog(true, onSuccess, onError)

          expect(reducer(INITIAL_STATE, action)).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
