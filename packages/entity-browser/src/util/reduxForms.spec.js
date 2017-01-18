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

