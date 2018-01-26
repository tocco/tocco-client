import * as reduxForm from './reduxForm'

describe('tocco-util', () => {
  describe('form', () => {
    describe('reduxForm', () => {
      describe('formValuesToEntity', () => {
        const entityName = 'User'
        const entityId = '99'
        it('should return entity with updated values', () => {
          const values = {
            firstname: 'peter',
            gender: {key: '2', display: 'W'},
            status: [{key: '2'}, {key: '3'}],
            __version: 3
          }

          const entityModel = {
            firstname: { },
            gender: {relationName: 'relGender', multi: false},
            status: {relationName: 'relStatus', multi: true}
          }

          const dirtyFields = ['firstname', 'gender', 'status']
          const result = reduxForm.formValuesToEntity(values, dirtyFields, entityName, entityId, entityModel)

          const expectedEntity = {
            version: 3,
            model: 'User',
            key: '99',
            paths: {
              firstname: 'peter',
              gender: {key: '2'},
              status: [{key: '2'}, {key: '3'}]
            }
          }

          expect(result).to.eql(expectedEntity)
        })

        it('should ignore pristine fields', () => {
          const values = {
            firstname: 'peter',
            lastname: 'asdasd',
            somefield: '',
            __version: 2
          }

          const entityModel = {
            firstname: { },
            lastname: { },
            somefield: { }
          }

          const dirtyFields = ['firstname', 'somefield']

          const result = reduxForm.formValuesToEntity(values, dirtyFields, entityName, entityId, entityModel)

          expect(result.paths).to.include.keys('firstname')
          expect(result.paths).to.not.include.keys('lastname')
          expect(result.paths).to.include.keys('somefield')
        })
      })

      describe('entityToFormValues', () => {
        it('should return paths values in an object ', () => {
          const entity = {
            model: 'User',
            key: '99',
            version: 0,
            paths: {
              lastname: {
                type: 'field',
                value: {
                  value: 'keller',
                  type: 'string'
                }
              },
              relMulti_entity2: {
                type: 'entity-list',
                value: [
                  {
                    key: '1',
                    model: 'Dummy_entity',
                    version: '1',
                    display: 'Entity Label 1',
                    fields: {}
                  },
                  {
                    key: '3',
                    model: 'Dummy_entity',
                    version: '1',
                    display: 'Entity Label 3'
                  }
                ]
              }
            }
          }
          const formValues = reduxForm.entityToFormValues(entity)

          const expectedValues = {
            __version: 0,
            lastname: 'keller',
            relMulti_entity2: entity.paths.relMulti_entity2.value
          }

          expect(formValues).to.eql(expectedValues)
        })

        describe('entityToFormValues', () => {
          it('should set version as value', () => {
            const entity = {
              model: 'User',
              key: '99',
              version: 23,
              paths: {}
            }
            const formValues = reduxForm.entityToFormValues(entity)
            expect(formValues).to.have.property('__version', 23)
          })
        })

        describe('entityToFormValues', () => {
          it('should return an empty object if entity is undefined', () => {
            const formValues = reduxForm.entityToFormValues(undefined)
            expect(formValues).to.be.empty
          })
        })
      })

      describe('getDirtyFields', () => {
        it('should return an array of changed fields', () => {
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
        it('should return root entity fields in object', () => {
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
                'fieldZ': mandatory
              }
            }
          ]
          const formErrors = reduxForm.validationErrorToFormError(entity, validationErrors)

          expect(formErrors).to.have.property('firstname')
          expect(formErrors).to.have.property('_error')
          expect(formErrors.firstname).to.eql(mandatory)
        })

        it('should return a valid object if error is undefined', () => {
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
