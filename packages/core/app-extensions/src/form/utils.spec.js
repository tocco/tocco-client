import {getFormFieldDefinition, hasError} from './utils'

describe('app-extensions', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('util', () => {
        describe('getFormFieldDefinition', () => {
          test('should flat field definition', () => {
            const fieldDefinition = {
              id: 'location',
              label: 'PLZ / Ort',
              componentType: 'field-set',
              children: [
                {
                  id: 'location',
                  label: null,
                  componentType: 'field',
                  path: null,
                  dataType: 'location',
                  validation: null,
                  defaultValue: null,
                  autoCompleteEndpoint: null,
                  dmsEntityModel: null,
                  locationMapping: {
                    postcode: 'zip',
                    city: 'city',
                    street: 'address',
                    country: 'relCountry',
                    state: 'canton'
                  }
                }
              ],
              readonly: false,
              hidden: false,
              useLabel: 'yes',
              scopes: [],
              ignoreCopy: false
            }

            const expectedFormFieldDefinition = {
              id: 'location',
              label: 'PLZ / Ort',
              componentType: 'field',
              path: null,
              dataType: 'location',
              validation: null,
              defaultValue: null,
              autoCompleteEndpoint: null,
              dmsEntityModel: null,
              locationMapping: {
                postcode: 'zip',
                city: 'city',
                street: 'address',
                country: 'relCountry',
                state: 'canton'
              },
              readonly: false,
              hidden: false,
              scopes: []
            }

            expect(getFormFieldDefinition(fieldDefinition)).to.deep.equal(expectedFormFieldDefinition)
          })

          test('should ignore action components as children', () => {
            const fieldDefinition = {
              id: 'zip',
              label: 'PLZ',
              componentType: 'field-set',
              children: [
                {
                  id: 'zip',
                  label: null,
                  componentType: 'field',
                  path: 'zip',
                  dataType: 'postcode',
                  validation: {
                    length: {
                      toIncluding: 10
                    },
                    mandatory: true
                  },
                  defaultValue: null,
                  autoCompleteEndpoint: null,
                  dmsEntityModel: null
                },
                {
                  id: 'action'
                }
              ],
              readonly: false,
              hidden: true,
              useLabel: 'yes',
              scopes: [],
              ignoreCopy: false
            }

            const expectedFormFieldDefinition = {
              id: 'zip',
              label: 'PLZ',
              componentType: 'field',
              path: 'zip',
              dataType: 'postcode',
              validation: {
                length: {
                  toIncluding: 10
                },
                mandatory: true
              },
              defaultValue: null,
              autoCompleteEndpoint: null,
              dmsEntityModel: null,
              readonly: false,
              hidden: true,
              scopes: []
            }

            expect(getFormFieldDefinition(fieldDefinition)).to.deep.equal(expectedFormFieldDefinition)
          })
        })

        describe('hasError', () => {
          test('should detect one error', () => {
            const error = {
              mandatory: 'Mandatory field'
            }

            expect(hasError(error)).to.be.true
          })

          test('should ignore empty objects', () => {
            const error = {}

            expect(hasError(error)).to.be.false
          })

          test('should handle undefined object', () => {
            expect(hasError(undefined)).to.be.false
          })
        })
      })
    })
  })
})
