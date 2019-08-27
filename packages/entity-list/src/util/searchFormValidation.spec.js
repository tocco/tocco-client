import {validateSearchFields} from './searchFormValidation'

describe('entity-list', () => {
  describe('util', () => {
    describe('searchFormValidation', () => {
      describe('validateSearchFields', () => {
        test('should not return en error if nothing is set', () => {
          const formDefinition = require('../dev/test-data/user_search.json').form
          const values = {}

          const errors = validateSearchFields(values, formDefinition)
          expect(Object.keys(errors)).to.have.length(0)
        })

        test(
          'should return an error for text-field that to not fulfill minimum length',
          () => {
            const formDefinition = require('../dev/test-data/user_search.json').form
            const values = {
              'txtFulltext': 'a',
              'firstname': 'a',
              'relAddress_user.relAddress': 'abc'
            }

            const errors = validateSearchFields(values, formDefinition)
            expect(Object.keys(errors)).to.have.length(2)
            expect(errors).to.have.property('txtFulltext')
            expect(errors).to.have.property('firstname')
          }
        )
      })
    })
  })
})
