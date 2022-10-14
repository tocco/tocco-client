import * as reduxForm from './reduxForm'

describe('app-extensions', () => {
  describe('form', () => {
    describe('reduxForm', () => {
      describe('entityToFormValues', () => {
        test('should transform names to a redux-form compatible one', () => {
          const entity = {
            firstname: 'Max',
            customer: false,
            'relGender.label': 'Male'
          }

          const result = reduxForm.entityToFormValues(entity, [])

          const expectedResult = {
            firstname: 'Max',
            customer: false,
            'relGender--label': 'Male'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should map type mappings to form field values', () => {
          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]

          const entity = {
            zip: '123'
          }

          const result = reduxForm.entityToFormValues(entity, fieldDefinitions)

          const expectedResult = {
            location: {
              postcode: '123'
            },
            zip: '123'
          }

          expect(result).to.eql(expectedResult)
        })
      })

      describe('formValuesToFlattenEntity', () => {
        test('should transform names back to dot notation', () => {
          const formValues = {
            firstname: 'Max',
            customer: false,
            'relGender--label': 'Male'
          }

          const result = reduxForm.formValuesToFlattenEntity(formValues, [])
          const expectedResult = {
            firstname: 'Max',
            customer: false,
            'relGender.label': 'Male'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should map form field values (virtual fields) to entity fields', () => {
          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]

          const formValues = {
            location: {
              postcode: '123'
            }
          }

          const result = reduxForm.formValuesToFlattenEntity(formValues, fieldDefinitions)
          const expectedResult = {
            zip: '123'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should overwrite entity field by form field values (virtual fields)', () => {
          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]

          const formValues = {
            location: {
              postcode: '456'
            },
            zip: '123'
          }

          const result = reduxForm.formValuesToFlattenEntity(formValues, fieldDefinitions)
          const expectedResult = {
            zip: '456'
          }

          expect(result).to.eql(expectedResult)
        })
      })

      describe('getDirtyFormValues', () => {
        test('should return an array of changed fields', () => {
          const values = {
            firstname: 'peter',
            lastname: 'griffin',
            bool: true,
            array1: [1, 2, 3],
            array2: [1, 2, 3]
          }

          const initialValues = {
            firstname: 'martin',
            lastname: 'griffin',
            bool: false,
            array1: [1, 2, 3],
            array2: [1, 2, 4]
          }
          const drityFormValues = reduxForm.getDirtyFormValues(initialValues, values)

          expect(drityFormValues).to.deep.eql({
            firstname: 'peter',
            bool: true,
            array2: [1, 2, 3]
          })
        })

        test('should ignore pristine fields with same name prefix', () => {
          const values = {
            registration_internet_from: '2021-01-29T11:00:00.000Z',
            registration: 1
          }

          const initialValues = {
            registration: 1
          }

          const drityFormValues = reduxForm.getDirtyFormValues(initialValues, values)

          expect(drityFormValues).to.deep.eql({
            registration_internet_from: '2021-01-29T11:00:00.000Z'
          })
        })

        test('should keep meta fields', () => {
          const values = {
            __version: 3,
            __key: '2',
            __model: 'User',
            registration: 1
          }

          const initialValues = {
            __version: 3,
            __key: '2',
            __model: 'User',
            registration: 1
          }

          const drityFormValues = reduxForm.getDirtyFormValues(initialValues, values)

          expect(drityFormValues).to.deep.eql({
            __version: 3,
            __key: '2',
            __model: 'User'
          })
        })

        test('should ignore pristine fields', () => {
          const values = {
            firstname: 'peter',
            lastname: 'griffin'
          }

          const initialValues = {
            firstname: 'peter',
            lastname: 'griffin'
          }

          const drityFormValues = reduxForm.getDirtyFormValues(initialValues, values)

          expect(drityFormValues).to.deep.eql({})
        })

        test('should handle multi paths correctly', () => {
          const values = {
            relGender: {key: '2', version: 3, model: 'Gender'},
            'relGender--relXy': {key: '33', version: 4},
            'relGender--relXy--Z': 'TEST',
            'relGender--relXy--Y': 'TEST'
          }

          const initialValues = {
            relGender: {key: '2', version: 3, model: 'Gender'},
            'relGender--relXy': {key: '33', version: 4},
            'relGender--relXy--Z': '', // changed
            'relGender--relXy--Y': 'TEST'
          }

          const drityFormValues = reduxForm.getDirtyFormValues(initialValues, values)

          expect(drityFormValues).to.deep.eql({
            relGender: {key: '2', version: 3, model: 'Gender'},
            'relGender--relXy': {key: '33', version: 4},
            'relGender--relXy--Z': 'TEST'
          })
        })

        test('should keep meta fields for selectors', () => {
          const values = {
            'relAddress_user=-=publication=_=': {key: '2', version: 3, model: 'Address_user'},
            'relAddress_user=-=publication=_=--relAddress': {key: '7', version: 1, model: 'Address'},
            'relAddress_user=-=publication=_=--relAddress--address_c': 'Hauptrasse 7a',
            'relAddress_user=-=publication=_=--relAddress--zip_c': '8400'
          }

          const initialValues = {
            'relAddress_user=-=publication=_=': {key: '2', version: 3, model: 'Address_user'},
            'relAddress_user=-=publication=_=--relAddress': {key: '7', version: 1, model: 'Address'},
            'relAddress_user=-=publication=_=--relAddress--address_c': 'Hauptrasse 1', // changed
            'relAddress_user=-=publication=_=--relAddress--zip_c': '8400'
          }

          const drityFormValues = reduxForm.getDirtyFormValues(initialValues, values)

          expect(drityFormValues).to.deep.eql({
            'relAddress_user=-=publication=_=': {key: '2', version: 3, model: 'Address_user'},
            'relAddress_user=-=publication=_=--relAddress': {key: '7', version: 1, model: 'Address'},
            'relAddress_user=-=publication=_=--relAddress--address_c': 'Hauptrasse 7a' // changed
          })
        })
      })

      describe('validationErrorToFormError', () => {
        test('should return root entity fields in object', () => {
          const entity = {
            model: 'User',
            key: '2'
          }

          const mandatory = {mandatory: 'mandatory'}
          const validationErrors = [
            {
              model: 'User',
              key: '2',
              paths: {
                firstname: mandatory
              }
            },
            {
              model: 'relStatus',
              key: '99',
              paths: {
                fieldZ: mandatory
              }
            }
          ]
          const formErrors = reduxForm.validationErrorToFormError(entity, [], validationErrors)

          expect(formErrors).to.have.property('firstname')
          expect(formErrors).to.have.property('_error')
          expect(formErrors.firstname).to.eql(mandatory)
        })

        test('should map errors for form field errors', () => {
          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]

          const entity = {
            model: 'User',
            key: '2'
          }

          const mandatory = {mandatory: 'mandatory'}
          const validationErrors = [
            {
              model: 'User',
              key: '2',
              paths: {
                zip: mandatory
              }
            }
          ]
          const formErrors = reduxForm.validationErrorToFormError(entity, fieldDefinitions, validationErrors)

          expect(formErrors).to.have.property('zip')
          expect(formErrors).to.have.property('location')
          expect(formErrors.zip).to.eql(mandatory)
          expect(formErrors.location).to.eql(mandatory)
        })

        test('should return a valid object if error is undefined', () => {
          const entity = {
            model: 'User',
            key: '2'
          }

          const formErrors = reduxForm.validationErrorToFormError(entity, [], undefined)

          expect(formErrors).to.have.property('_error')
        })
      })

      describe('transformFieldName', () => {
        test('null as field name', () => {
          expect(reduxForm.transformFieldName(null)).to.be.eql(null)
        })

        test('transform field with relation', () => {
          expect(reduxForm.transformFieldName('relAddress.address_c')).to.be.eql('relAddress--address_c')
        })

        test('transform field with selector', () => {
          expect(reduxForm.transformFieldName('relAddress_user[publication].relAddress.address_c')).to.be.eql(
            'relAddress_user=-=publication=_=--relAddress--address_c'
          )
        })
      })

      describe('transformFieldNameBack', () => {
        test('null as field name', () => {
          expect(reduxForm.transformFieldNameBack(null)).to.be.eql(null)
        })

        test('transform field with relation', () => {
          expect(reduxForm.transformFieldNameBack('relAddress--address_c')).to.be.eql('relAddress.address_c')
        })

        test('transform field with selector', () => {
          expect(reduxForm.transformFieldNameBack('relAddress_user=-=publication=_=--relAddress--address_c')).to.be.eql(
            'relAddress_user[publication].relAddress.address_c'
          )
        })
      })

      describe('isValueEmpty', () => {
        test('should return true for empty values', () => {
          expect(reduxForm.isValueEmpty(null)).to.be.true
          expect(reduxForm.isValueEmpty(undefined)).to.be.true
          expect(reduxForm.isValueEmpty('')).to.be.true
          expect(reduxForm.isValueEmpty([])).to.be.true
          expect(reduxForm.isValueEmpty({})).to.be.true
        })

        test('should return false for none-empty values', () => {
          expect(reduxForm.isValueEmpty('test')).to.be.false
          expect(reduxForm.isValueEmpty(0)).to.be.false
          expect(reduxForm.isValueEmpty(-1)).to.be.false
          expect(reduxForm.isValueEmpty(false)).to.be.false
          expect(reduxForm.isValueEmpty({test: 1})).to.be.false
          expect(reduxForm.isValueEmpty([1])).to.be.false
        })
      })
    })
  })
})
