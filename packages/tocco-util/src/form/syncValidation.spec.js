import syncValidation from './syncValidation'
import {IntlStub} from 'tocco-test-util'

describe('tocco-util', () => {
  describe('form', () => {
    describe('syncValidation', () => {
      it('should combine model and type validation errors', () => {
        const entityModel = {
          website: {
            fieldName: 'website',
            type: 'url',
            validation: {
              mandatory: true,
              minLength: 3
            }
          }
        }
        const validate = syncValidation(entityModel, IntlStub)

        const errors = validate({website: 'aa'})

        expect(errors).to.have.property('website')
        expect(errors.website).to.have.property('minLength')
        expect(errors.website).to.have.property('format')
      })

      it('should return no error on valid input', () => {
        const entityModel = {
          website: {
            type: 'url',
            validate: {
              mandatory: true,
              minLength: 3
            }
          }
        }

        const values = {
          website: 'http://www.tocco.ch'
        }

        const errors = syncValidation(entityModel, IntlStub)(values)
        expect(errors).to.eql({})
      })
    })
  })
})
