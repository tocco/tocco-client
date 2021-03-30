import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  isWaiting: false,
  input: {
    selection: null,
    onSuccess: null,
    onError: null
  }
}

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('move', () => {
          describe('reducer', () => {
            test('should create a valid initial state', () => {
              expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
            })

            test('should handle SET_WAITING action', () => {
              const selection = {type: 'QUERY', entityName: 'Docs_list_item'}
              const onSuccess = () => {}
              const onError = () => {}

              const expectedStateAfter = {
                ...INITIAL_STATE,
                input: {
                  selection,
                  onSuccess,
                  onError
                }
              }

              const action = actions.initialize(selection, onSuccess, onError)
              expect(reducer(INITIAL_STATE, action)).to.deep.equal(expectedStateAfter)
            })

            test('should handle SET_WAITING action', () => {
              const expectedStateAfter = {
                ...INITIAL_STATE,
                isWaiting: true
              }

              expect(reducer(INITIAL_STATE, actions.setWaiting())).to.deep.equal(expectedStateAfter)
            })

            test('should handle CLOSE action', () => {
              const state = {
                isWaiting: true
              }

              expect(reducer(state, actions.close())).to.deep.equal(INITIAL_STATE)
            })
          })
        })
      })
    })
  })
})
