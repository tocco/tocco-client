import * as reduxForm from './reduxForm'

describe('entity-detail', () => {
  describe('util', () => {
    describe('detailView', () => {
      describe('reduxForms', () => {
        describe('formValuesToEntity', () => {
          it('should return entity with updated values', () => {
            const values = {
              firstname: 'peter',
              gender: {key: '2', display: 'W'},
              status: [{key: '2'}, {key: '3'}],
              ___entity: {
                version: 2,
                model: 'User',
                key: 99,
                paths: {
                  firstname: {
                    type: 'field'
                  },
                  gender: {
                    type: 'entity'
                  },
                  status: {
                    type: 'entity-list'
                  }
                }
              }

            }
            const result = reduxForm.formValuesToEntity(values)

            const expectedEntity = {
              version: 2,
              model: 'User',
              key: 99,
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
              ___entity: {
                version: 2,
                model: 'User',
                key: 99,
                paths: {
                  firstname: {
                    type: 'field'
                  },
                  lastname: {
                    type: 'field'
                  },
                  somefield: {
                    type: 'field'
                  }
                }
              }
            }
            const result = reduxForm.formValuesToEntity(values, ['firstname', 'somefield'])

            expect(result.paths).to.include.keys('firstname')
            expect(result.paths).to.not.include.keys('lastname')
            expect(result.paths).to.include.keys('somefield')
          })
        })

        describe('entityToFormValues', () => {
          it('should return value object with whole entity as value', () => {
            const result = reduxForm.entityToFormValues({})
            expect(result).to.eql({})
          })

          it('should return value object with whole entity as value', () => {
            const entity = {
              paths: {
                firstname: {
                  value: {
                    value: 'TestFirstName'
                  }
                },
                lastname: {
                  value: {
                    value: 'TestLastName'
                  }
                }
              }
            }

            const result = reduxForm.entityToFormValues(entity)

            const expectedValues = {
              firstname: 'TestFirstName',
              lastname: 'TestLastName',
              ___entity: entity
            }

            expect(result).to.eql(expectedValues)
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
        })
      })
    })
  })
})
