import * as asyncValidation from './asyncValidation'
import fetchMock from 'fetch-mock'
import { SubmissionError } from 'redux-form'

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

          it('should not throw an error if valid', done => {
            fetchMock.patch('*', {valid: true, errors: {}})
            const values = {firstname: ''}
            asyncValidation.submitValidate(
              values, mockData.initialValues, mockData.entityName,
              mockData.entityId, mockData.entityModel, mockData.mode
            ).then(res => {
              done()
            })
          })

          it('should throw a SubmissionError', done => {
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

          it('should not throw an error if valid', done => {
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

          it('should throw an Error if not valid', done => {
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
        })
      })
    })
  })
})
