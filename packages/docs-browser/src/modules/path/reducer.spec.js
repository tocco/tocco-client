import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  breadcrumbs: [],
  searchMode: false
}

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('path', () => {
          describe('reducer', () => {
            test('should create a valid initial state', () => {
              expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
            })

            test('should handle SET_BREADCRUMBS action', () => {
              const breadcrumbs = [{display: 'item 1'}, {display: 'item 2'}]
              const expectedStateAfter = {
                ...INITIAL_STATE,
                breadcrumbs
              }

              expect(reducer(INITIAL_STATE, actions.setBreadcrumbs(breadcrumbs))).to.deep.equal(expectedStateAfter)
            })

            test('should handle SET_SEARCH_MODE action', () => {
              const expectedStateAfter = {
                ...INITIAL_STATE,
                searchMode: true
              }

              expect(reducer(INITIAL_STATE, actions.setSearchMode(true))).to.deep.equal(expectedStateAfter)
            })
          })
        })
      })
    })
  })
})
