import fetchMock from 'fetch-mock'
import {SubmissionError} from 'redux-form'

import * as asyncValidation from './asyncValidation'

const mockData = {
  initialValues: {firstname: ''},
  entityModel: {firstname: {type: 'string'}},
  mode: 'update',
  entityName: 'User',
  entityId: '1'

}

describe('entity-detail', () => {
  describe('util', () => {
    describe('detaiLView', () => {
      describe('asyncValidation', () => {
        describe('submitValidate', () => {
          beforeEach(() => {
            fetchMock.reset()
            fetchMock.restore()
          })

          test('should not throw an error if valid', done => {
            fetchMock.patch('*', {valid: true, errors: {}})
            const values = {firstname: ''}
            asyncValidation.submitValidate(
              values, mockData.initialValues, mockData.entityName,
              mockData.entityId, mockData.entityModel, mockData.mode
            ).then(() => {
              done()
            })
          })

          test('should throw a SubmissionError', done => {
            fetchMock.patch('*', {
              valid: false,
              errors: [
                {
                  key: '1',
                  model: 'User',
                  paths: {
                    firstname: {
                      mandatory: ['Field required!']
                    }
                  }
                }
              ]
            })
            const values = {firstname: ''}
            asyncValidation.submitValidate(
              values, mockData.initialValues, mockData.entityName,
              mockData.entityId, mockData.entityModel, mockData.mode
            ).catch(err => {
              expect(err).to.be.instanceof(SubmissionError)
              expect(err.errors).to.have.property('firstname')
              done()
            })
          })
        })

        describe('asyncValidate', () => {
          beforeEach(() => {
            fetchMock.reset()
            fetchMock.restore()
          })

          test('should not throw an error if valid', done => {
            fetchMock.patch('*', {valid: true, errors: {}})
            const values = {firstname: ''}
            asyncValidation.asyncValidate(
              values, mockData.initialValues, mockData.entityName,
              mockData.entityId, mockData.entityModel, mockData.mode
            )
              .then(() => {
                done()
              })
          })

          test('should throw an Error if not valid', done => {
            fetchMock.patch('*', {
              valid: false,
              errors: [
                {
                  key: '1',
                  model: 'User',
                  paths: {
                    firstname: {
                      mandatory: ['Field required!']
                    }
                  }
                }
              ]
            })
            const values = {firstname: ''}
            asyncValidation.asyncValidate(
              values, mockData.initialValues, mockData.entityName,
              mockData.entityId, mockData.entityModel, mockData.mode
            ).catch(error => {
              expect(error).to.be.instanceof(asyncValidation.AsyncValidationException)
              expect(error.errors).to.have.property('firstname')
              done()
            })
          })

          const requestMockData = {
            initialValues: {firstname: '', phone_company: ''},
            entityModel: {
              firstname: {type: 'string'},
              phone_company: {
                defaultCountry: 'CH',
                fieldName: 'phone_company',
                type: 'phone'
              }
            },
            mode: 'update',
            entityName: 'User',
            entityId: '1'
          }

          test('should not throw a request error if other errors exist', done => {
            fetchMock.patch('*', {
              valid: false,
              errors: [
                {
                  key: '1',
                  model: 'User',
                  paths: {
                    firstname: {
                      mandatory: ['Field required!']
                    }
                  }
                }
              ]
            })

            const invalidValues = {firstname: 'illegal', phone_company: '1234'}

            asyncValidation.asyncValidate(
              invalidValues, requestMockData.initialValues, requestMockData.entityName,
              requestMockData.entityId, requestMockData.entityModel, requestMockData.mode
            ).catch(error => {
              expect(error).to.be.instanceof(asyncValidation.AsyncValidationException)
              expect(error.errors).to.have.property('phone_company')
              expect(error.errors).to.not.have.property('firstname')
              done()
            })
          })
        })
      })
    })
  })
})
