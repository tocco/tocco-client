import {getSingleEntitySelection} from './selection'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('utils', () => {
      describe('selection', () => {
        describe('getSingleEntitySelection', () => {
          it('should re', () => {
            const entityName = 'User'
            const key = '999'

            const result = getSingleEntitySelection(entityName, key)

            const expectedResult = {
              entityName,
              type: 'ID',
              ids: [key],
              count: 1
            }

            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
