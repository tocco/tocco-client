import syncValidation, {mandatoryValidator} from './syncValidation'

describe('entity-browser', () => {
  describe('util', () => {
    describe('syncValidation', () => {
      it('should return an error on invalid input', () => {
        const entityModel = {
          firstname: {
            validation: {
              mandatory: true,
              minLength: 3
            }
          }
        }
        const validate = syncValidation(entityModel)

        let errors = validate({firstname: ''})

        expect(errors).to.have.property('firstname')
        expect(errors.firstname).to.have.property('mandatory')

        errors = validate({firstname: 'xy'})

        expect(errors).to.have.property('firstname')
        expect(errors.firstname).to.not.have.property('mandatory')
        expect(errors.firstname).to.have.property('minLength')
      })

      it('should return an error on valid input', () => {
        const entityModel = {
          firstname: {
            validate: {
              mandatory: true,
              minLength: 3
            }
          }
        }

        const values = {
          firstname: 'TestFirstname'
        }

        const errors = syncValidation(entityModel)(values)
        expect(errors).to.eql({})
      })
    })
    describe('mandatoryValidator', () => {
      it('should not return an error for valid inputs', () => {
        const validValues = [
          'Test',
          0
        ]

        validValues.forEach(validValue => {
          let result = mandatoryValidator(validValue, true)
          expect(result).to.be.undefined
          result = mandatoryValidator(validValue, false)
          expect(result).to.be.undefined
        })
      })
      it('should return an error for invalid inputs', () => {
        const invalidValues = [
          undefined,
          '',
          null
        ]

        invalidValues.forEach(invalidValue => {
          let result = mandatoryValidator(invalidValue, true)
          expect(result).to.not.be.undefined
          result = mandatoryValidator(invalidValue, false)
          expect(result).to.be.undefined
        })
      })
    })
  })
})
