import * as actions from './actions'
import reducer from './reducer'

const INITIAL_STATE = {
  path: '',
  params: {}
}

describe('docs-browser', () => {
  describe('modules', () => {
    describe('routing', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })

        test('should handle SET_PATH action', () => {
          const expectedStateAfter = {
            ...INITIAL_STATE,
            path: '/docs/folder/1234/list'
          }

          const action = actions.navigate('/docs/folder/1234/list')
          expect(reducer(INITIAL_STATE, action)).to.deep.equal(expectedStateAfter)
        })

        test('should handle SET_PATAMS action', () => {
          const expectedStateAfter = {
            ...INITIAL_STATE,
            params: {
              model: 'folder',
              key: '1234',
              view: 'list'
            }
          }

          expect(
            reducer(
              INITIAL_STATE,
              actions.setParams({
                model: 'folder',
                key: '1234',
                view: 'list'
              })
            )
          ).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})
