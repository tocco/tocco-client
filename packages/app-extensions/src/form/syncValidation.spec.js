import syncValidation from './syncValidation'

describe('app-extensions', () => {
  describe('form', () => {
    describe('syncValidation', () => {
      const fieldDefinitions = [
        {
          componentType: 'field',
          dataType: 'string',
          id: 'firstname',
          label: 'Firstname',
          path: 'firstname',
          validation: {
            mandatory: true,
            length: {
              fromIncluding: 2,
              toIncluding: 2
            }
          }
        }
      ]

      test('should return an error if validator is not fulfilled', () => {
        const values = {firstname: 'a'}
        const errors = syncValidation(fieldDefinitions)(values)
        expect(errors).to.have.property('firstname')
        expect(errors.firstname).to.have.property('minLength')
      })

      test('should return no error on valid input', () => {
        const values = {firstname: 'aa'}
        const errors = syncValidation(fieldDefinitions)(values)
        expect(errors).to.eql({})
      })

      test('should return error on empty mandatory field', () => {
        const values = {}
        const errors = syncValidation(fieldDefinitions)(values)
        expect(errors).to.have.property('firstname')
        expect(errors.firstname).to.have.property('mandatory')
      })
    })
  })
})
