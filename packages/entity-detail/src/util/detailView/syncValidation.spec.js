import syncValidation, {mandatoryValidator} from './syncValidation'
import {IntlStub} from 'tocco-test-util'

describe('entity-detail', () => {
  describe('util', () => {
    describe('detaiLView', () => {
      describe('syncValidation', () => {
        it('should return an error on invalid input', () => {
          const entityModel = {
            firstname: {
              fieldName: 'firstname',
              validation: {
                mandatory: true,
                minLength: 3
              }
            }
          }
          const validate = syncValidation(entityModel, IntlStub)

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

          const errors = syncValidation(entityModel, IntlStub)(values)
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
            let result = mandatoryValidator(validValue, true, IntlStub)
            expect(result).to.be.undefined
            result = mandatoryValidator(validValue, false, IntlStub)
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
            let result = mandatoryValidator(invalidValue, true, IntlStub)
            expect(result).to.not.be.undefined
            result = mandatoryValidator(invalidValue, false, IntlStub)
            expect(result).to.be.undefined
          })
        })
      })
    })
  })
})
