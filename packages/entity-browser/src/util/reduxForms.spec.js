import * as reduxForms from './reduxForms'
import fetchMock from 'fetch-mock'
import {SubmissionError} from 'redux-form'

describe('entity-browser', () => {
  describe('util', () => {
    describe('reduxForm', () => {
      describe('formValuesToEntity', () => {
        it('should return entity with updated values', () => {
          const values = {
            firstname: 'peter',
            gender: '2',
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
                }
              }
            }

          }
          const result = reduxForms.formValuesToEntity(values)

          const expectedEntity = {
            version: 2,
            model: 'User',
            key: 99,
            paths: {
              firstname: 'peter',
              gender: {key: '2'}
            }
          }

          expect(result).to.eql(expectedEntity)
        })

        it('should ignore no dirty fields', () => {
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
          const result = reduxForms.formValuesToEntity(values, ['firstname', 'somefield'])

          expect(result.paths).to.include.keys('firstname')
          expect(result.paths).to.not.include.keys('lastname')
          expect(result.paths).to.include.keys('somefield')
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
          const diryFields = reduxForms.getDirtyFields(initialValues, values)

          expect(diryFields).to.eql(['firstname', 'bool', 'array2'])
        })
      })

      describe('submitValidate', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        it('should not throw an error if valid', done => {
          fetchMock.post('*', {fields: {}})
          const values = {firstname: '', ___entity: {paths: {firstname: {value: {value: 'test'}}}}}
          reduxForms.submitValidate(values).then(res => {
            done()
          })
        })

        it('should throw a SubmissionError', done => {
          fetchMock.post('*', {fields: {firstname: 'Field required!'}})
          const values = {firstname: '', ___entity: {paths: {firstname: {value: {value: 'test'}}}}}
          reduxForms.submitValidate(values).catch(err => {
            expect(err).to.be.an.instanceof(SubmissionError)
            expect(err.errors).to.eql({firstname: 'Field required!'})
            done()
          })
        })
      })

      describe('asyncValidate', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        it('should not throw an error if valid', done => {
          fetchMock.post('*', {fields: {}})
          const values = {firstname: '', ___entity: {paths: {firstname: {value: {value: 'test'}}}}}
          reduxForms.asyncValidate(values).then(res => {
            done()
          })
        })

        it('should throw an Error if not valid', done => {
          fetchMock.post('*', {fields: {firstname: 'Field required!'}})
          const values = {firstname: '', ___entity: {paths: {firstname: {value: {value: 'test'}}}}}
          reduxForms.asyncValidate(values).catch(err => {
            expect(err.firstname).to.eql('Field required!')
            done()
          })
        })
      })
    })
  })
})

