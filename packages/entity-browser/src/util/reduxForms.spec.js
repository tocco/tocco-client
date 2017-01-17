import * as reduxForms from './reduxForms'

describe('entity-browser', () => {
  describe('util', () => {
    describe('reduxForm', () => {
      describe('formValuesToEntity', () => {
        it('should return entity with updated values', () => {
          const values = {
            firstname: 'peter',
            lastname: 'griffin',
            ___entity: {
              paths: {
                firstname: {
                  value: {
                    value: 'OldName'
                  }
                },
                lastname: {
                  value: {
                    value: 'Old'
                  }
                }
              }
            }

          }
          const result = reduxForms.formValuesToEntity(values)

          const expectedEntity = {
            paths: {
              firstname: {
                value: {
                  value: 'peter'
                }
              },
              lastname: {
                value: {
                  value: 'griffin'
                }
              }
            }
          }

          expect(result).to.eql(expectedEntity)
        })
      })

      describe('entityToFormValues', () => {
        it('should return value object with whole entity as value', () => {
          const result = reduxForms.entityToFormValues({})
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

          const result = reduxForms.entityToFormValues(entity)

          const expectedValues = {
            firstname: 'TestFirstName',
            lastname: 'TestLastName',
            ___entity: entity
          }

          expect(result).to.eql(expectedValues)
        })
      })
    })
  })
})

