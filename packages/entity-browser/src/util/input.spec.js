import {validateAndGetDispatchActions} from './input'

describe('entity-browser', () => {
  describe('util', () => {
    describe('input', () => {
      describe('validateAndGetDispatchActions', () => {
        it('should accept a valid input', () => {
          const input = {
            entityName: 'User',
            limit: 50,
            formBase: 'UserSearch',
            showSearchForm: true,
            disableSimpleSearch: false,
            simpleSearchFields: ['txtFulltext']
          }

          const logError = sinon.spy()
          const result = validateAndGetDispatchActions(input, logError)

          expect(result).to.have.length(6)
          expect(logError).to.have.callCount(0)
        })
      })

      it('should accept a valid input', () => {
        const input = {
        }

        const logError = sinon.spy()
        const result = validateAndGetDispatchActions(input, logError)

        expect(result).to.have.length(0)
        expect(logError).to.have.callCount(1)
      })
    })
  })
})

