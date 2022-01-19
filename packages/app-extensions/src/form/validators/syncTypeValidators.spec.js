import {mandatoryError} from './mandatory'
import {locationValidator} from './syncTypeValidators'
import {maxLengthValidator} from './syncValidators'

const maxLenthError = maxLengthValidator('123456', 5)

describe('app-extensions', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('syncTypeValidators', () => {
        describe('location', () => {
          test('should validate city and postcode', () => {
            const fieldDefinition = {
              id: 'location',
              locationMapping: {
                city: 'city',
                postcode: 'postcode'
              }
            }
            const formDefinition = {
              id: 'box',
              children: [
                {
                  id: 'city',
                  children: [
                    {
                      path: 'city',
                      validation: {
                        mandatory: true
                      }
                    }
                  ]
                },
                {
                  id: 'postcode',
                  children: [
                    {
                      path: 'postcode',
                      validation: {
                        mandatory: true,
                        length: {
                          toIncluding: 5
                        }
                      }
                    }
                  ]
                }
              ]
            }
            const values = {
              postcode: '123456'
            }

            const expectedErrors = {
              city: mandatoryError,
              postcode: maxLenthError,
              location: {
                ...mandatoryError,
                ...maxLenthError
              }
            }

            const errors = locationValidator(undefined, fieldDefinition, formDefinition, values)

            expect(errors).to.deep.equal(expectedErrors)
          })

          test('should return empty errors if field is valid', () => {
            const fieldDefinition = {
              id: 'location',
              locationMapping: {
                city: 'city',
                postcode: 'postcode'
              }
            }
            const formDefinition = {
              id: 'box',
              children: [
                {
                  id: 'city',
                  children: [
                    {
                      path: 'city',
                      validation: {}
                    }
                  ]
                },
                {
                  id: 'postcode',
                  children: [
                    {
                      path: 'postcode',
                      validation: {
                        mandatory: true
                      }
                    }
                  ]
                }
              ]
            }
            const values = {
              postcode: '123456'
            }

            const expectedErrors = {}

            const errors = locationValidator(undefined, fieldDefinition, formDefinition, values)

            expect(errors).to.deep.equal(expectedErrors)
          })
        })
      })
    })
  })
})
