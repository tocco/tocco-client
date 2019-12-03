import * as reduxForm from './reduxForm'

describe('app-extensions', () => {
  describe('form', () => {
    describe('reduxForm', () => {
      describe('entityToFormValues', () => {
        test('should transform names to a redux-form compatible one', () => {
          const entity = {
            'firstname': 'Max',
            'customer': false,
            'relGender.label': 'Male'
          }

          const result = reduxForm.entityToFormValues(entity)

          const expectedResult = {
            'firstname': 'Max',
            'customer': false,
            'relGender--label': 'Male'
          }

          expect(result).to.eql(expectedResult)
        })
      })

      describe('formValuesToFlattenEntity', () => {
        test('should transform names back to dot notation', () => {
          const formValues = {
            'firstname': 'Max',
            'customer': false,
            'relGender--label': 'Male'
          }

          const result = reduxForm.formValuesToFlattenEntity(formValues)
          const expectedResult = {
            'firstname': 'Max',
            'customer': false,
            'relGender.label': 'Male'
          }

          expect(result).to.eql(expectedResult)
        })
      })

      describe('getDirtyFields', () => {
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
          const diryFields = reduxForm.getDirtyFields(initialValues, values)

          expect(diryFields).to.eql(['firstname', 'bool', 'array2'])
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
          const formErrors = reduxForm.validationErrorToFormError(entity, validationErrors)

          expect(formErrors).to.have.property('firstname')
          expect(formErrors).to.have.property('_error')
          expect(formErrors.firstname).to.eql(mandatory)
        })

        test('should return a valid object if error is undefined', () => {
          const entity = {
            model: 'User',
            key: '2'
          }

          const formErrors = reduxForm.validationErrorToFormError(entity, undefined)

          expect(formErrors).to.have.property('_error')
        })
      })
    })
  })
})
