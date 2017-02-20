import * as asyncValidation from './asyncValidation'
import fetchMock from 'fetch-mock'
import {SubmissionError} from 'redux-form'

describe('entity-browser', () => {
  describe('util', () => {
    describe('asyncValidation', () => {
      describe('submitValidate', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        it('should not throw an error if valid', done => {
          fetchMock.patch('*', {valid: true, errors: {}})
          const values = {firstname: '', ___entity: {paths: {firstname: {value: {value: 'test'}}}}}
          asyncValidation.submitValidate(values).then(res => {
            done()
          })
        })

        it('should throw a SubmissionError', done => {
          fetchMock.patch('*', {
            valid: false,
            errors: [
              {
                key: 1,
                model: 'User',
                paths: {
                  firstname: {
                    mandatory: ['Field required!']
                  }
                }
              }
            ]
          })

          const values = {
            firstname: '',
            ___entity: {key: 1, model: 'User', paths: {firstname: {value: {value: ''}}}}
          }
          asyncValidation.submitValidate(values).catch(err => {
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
          const values = {firstname: '', ___entity: {paths: {firstname: {value: {value: 'test'}}}}}
          asyncValidation.asyncValidate(values).then(() => {
            done()
          })
        })

        it('should throw an Error if not valid', done => {
          fetchMock.patch('*', {
            valid: false,
            errors: [
              {
                key: 1,
                model: 'User',
                paths: {
                  firstname: {
                    mandatory: ['Field required!']
                  }
                }
              }
            ]
          })
          const values = {
            firstname: '',
            ___entity: {key: 1, model: 'User', paths: {firstname: {value: {value: 'test'}}}}
          }
          asyncValidation.asyncValidate(values).catch(error => {
            expect(error).to.be.instanceof(asyncValidation.AsyncValidationException)
            expect(error.errors).to.have.property('firstname')
            done()
          })
        })
      })
    })
  })
})

