import {IntlStub} from 'tocco-test-util'

import syncValidation from './syncValidation'

describe('app-extensions', () => {
  describe('form', () => {
    describe('syncValidation', () => {
      test('should combine model and type validation errors', () => {
        const entityModel = {
          paths: {
            website: {
              fieldName: 'website',
              type: 'url',
              validation: {
                mandatory: true,
                minLength: 3
              }
            }
          }
        }
        const validate = syncValidation(entityModel, IntlStub)

        const errors = validate({website: 'aa'})

        expect(errors).to.have.property('website')
        expect(errors.website).to.have.property('minLength')
        expect(errors.website).to.have.property('format')
      })

      test('should return no error on valid input', () => {
        const entityModel = {
          paths: {
            website: {
              type: 'url',
              validate: {
                mandatory: true,
                minLength: 3
              }
            }
          }
        }

        const values = {
          website: 'http://www.tocco.ch'
        }

        const errors = syncValidation(entityModel, IntlStub)(values)
        expect(errors).to.eql({})
      })

      test('should return no error on unspecified validator', () => {
        const entityModel = {
          iban: {
            type: 'string',
            validate: {
              mandatory: true,
              minLength: 3
            }
          }
        }

        const values = {
          iban: 'CH-05-123456789'
        }

        const errors = syncValidation(entityModel, IntlStub)(values)
        expect(errors).to.eql({})
      })
    })
  })
})
