import syncValidation from './syncValidation'

describe('entity-browser', () => {
  describe('util', () => {
    describe('syncValidation', () => {
      it('should return an error on invalid input', () => {
        const entityModel = {
          firstname: {
            validate: {
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
  })
})
