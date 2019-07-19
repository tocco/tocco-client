import * as reduxForm from './reduxForm'

describe('app-extensions', () => {
  describe('form', () => {
    describe('reduxForm', () => {
      describe('formValuesToEntity', () => {
        const entityName = 'User'
        const entityId = '99'
        test('should return entity with updated values', () => {
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

        test('should ignore pristine fields', () => {
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
        test('should return paths values in an object and set empty values as null', () => {
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
              mail: {
                type: 'field',
                value: {
                  value: 'test@test.ch',
                  type: 'email'
                }
              },
              profession: {
                path: 'profession',
                type: 'field',
                value: {
                  value: '',
                  type: 'string'
                }
              }
            }
          }

          const formValues = reduxForm.entityToFormValues(entity)

          expect(formValues).to.have.property('lastname', 'keller')
          expect(formValues).to.have.property('mail', 'test@test.ch')
          expect(formValues).to.have.property('profession', null)
        })

        test('should relations as simple object with only relevant attributes', () => {
          const entity = {
            model: 'User',
            key: '99',
            version: 0,
            paths: {
              relGender: {
                path: 'relGender',
                type: 'entity',
                value: {
                  key: '2',
                  model: 'Gender',
                  version: 3,
                  display: 'Weiblich',
                  fields: null,
                  singleRelations: [],
                  multiRelations: [],
                  paths: null
                }
              },
              relMulti_entity2: {
                path: 'relMulti_entity2',
                type: 'entity-list',
                value: [
                  {
                    key: '1',
                    model: 'Dummy_entity',
                    version: '1',
                    display: 'Entity Label 1'
                  },
                  {
                    key: '3',
                    model: 'Dummy_entity',
                    version: '1',
                    display: 'Entity Label 3'
                  }
                ]
              },
              relNative_language: {
                path: 'relNative_language',
                type: 'entity',
                writable: true,
                value: null
              }
            }
          }

          const formValues = reduxForm.entityToFormValues(entity)

          expect(formValues).to.have.deep.property('relGender', {key: '2', display: 'Weiblich'})
          expect(formValues).to.have.deep.property('relNative_language', null)
          expect(formValues).to.have.deep.property('relMulti_entity2',
            [{key: '1', display: 'Entity Label 1'}, {key: '3', display: 'Entity Label 3'}]
          )
        })

        test('should handle display expressions', () => {
          const entity = {
            model: 'User',
            key: '99',
            version: 0,
            paths: {
              durationDisplay: {
                path: 'durationDisplay',
                type: 'display-expression',
                value: '<b>bold</b> <i>italic</i>'
              }
            }
          }

          const formValues = reduxForm.entityToFormValues(entity)

          expect(formValues).to.have.deep.property('durationDisplay', '<b>bold</b> <i>italic</i>')
        })

        test('should set version as value', () => {
          const entity = {
            model: 'User',
            key: '99',
            version: 23,
            paths: {}
          }
          const formValues = reduxForm.entityToFormValues(entity)
          expect(formValues).to.have.property('__version', 23)
        })

        test('should return an empty object if entity is undefined', () => {
          const formValues = reduxForm.entityToFormValues(undefined)
          expect(formValues).to.be.empty
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
                'fieldZ': mandatory
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
