import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  dialog: {
    instanceCount: 0,
    location: null,
    directory: false,
    onSuccess: null,
    onError: null
  }
}

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('create', () => {
          describe('reducer', () => {
            test('should create a valid initial state', () => {
              expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
            })

            test('should handle OPEN_DIALOG action', () => {
              const location = '/docs/folders/23523/list'
              const onSuccess = () => {}
              const onError = () => {}

              const expectedStateAfter = {
                ...INITIAL_STATE,
                dialog: {
                  instanceCount: 1,
                  directory: true,
                  location,
                  onSuccess,
                  onError
                }
              }

              const action = actions.openDialog(location, true, onSuccess, onError)

              expect(reducer(INITIAL_STATE, action)).to.deep.equal(expectedStateAfter)
            })
          })
        })
      })
    })
  })
})
