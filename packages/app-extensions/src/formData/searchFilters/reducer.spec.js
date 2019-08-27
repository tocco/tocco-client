import * as actions from './actions'
import reducer from './reducer'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('searchFilters', () => {
      describe('reducer', () => {
        describe('setSearchFilter', () => {
          test('should set search filters', () => {
            const searchFilters = [
              {key: 'key1', display: 'display1'},
              {key: 'key2', display: 'display2'}
            ]

            const stateBefore = {}

            const expectedStateAfter = {
              User: searchFilters
            }

            expect(reducer(stateBefore, actions.setSearchFilter('User', searchFilters)))
              .to.deep.equal(expectedStateAfter)
          })

          test('should update search filters', () => {
            const searchFilters = [
              {key: 'key1', display: 'display1'},
              {key: 'key2', display: 'display2'}
            ]

            const stateBefore = {
              User: [{key: 'someOther', display: 'Some Other'}]
            }

            const expectedStateAfter = {
              User: searchFilters
            }

            expect(reducer(stateBefore, actions.setSearchFilter('User', searchFilters)))
              .to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
