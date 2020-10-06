import fetchMock from 'fetch-mock'
import {SubmissionError} from 'redux-form'

import {asyncValidation, submitValidation} from './asyncValidation'

const mockData = {
  baseFormValues: {
    __key: '1',
    __model: 'User'
  },
  initialValues: {
    __key: '1',
    __model: 'User',
    firstname: ''
  },
  fieldDefinitions: [
    {
      componentType: 'field',
      dataType: 'string',
      id: 'firstname',
      label: 'Firstname',
      path: 'firstname',
      validation: {
        mandatory: true,
        length: {
          fromIncluding: 2,
          toIncluding: 2
        }
      }
    },
    {
      componentType: 'field',
      dataType: 'phone',
      id: 'phone_mobile',
      label: 'Mobile',
      path: 'phone_mobile',
      validation: {
        phone: {
          defaultRegion: 'CH',
          customRegex: ''
        }
      }
    }
  ],
  mode: 'update',
  entityName: 'User',
  entityId: '1'
}

describe('app-extensions', () => {
  beforeEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  describe('form', () => {
    describe('asyncValidation', () => {
      describe('submitValidate', () => {
        test('should not throw an error if valid', async() => {
          fetchMock.patch('*', {
            valid: true,
            errors: {}
          })
          const values = {
            ...mockData.baseFormValues,
            firstname: ''
          }

          await submitValidation(values, mockData.initialValues, mockData.mode)
        })

        test('should throw a SubmissionError', async() => {
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

          const formValues = {
            ...mockData.baseFormValues,
            firstname: ''
          }
          try {
            await submitValidation(formValues, mockData.initialValues, mockData.mode)
          } catch (err) {
            expect(err).to.be.instanceof(SubmissionError)
            expect(err.errors).to.have.property('firstname')
          }
        })
      })

      describe('asyncValidate', () => {
        test('should not throw an error if valid with backend request', async() => {
          fetchMock.patch('*', {
            valid: true,
            errors: {}
          })

          const values = {phone_mobile: '+41444005555'}
          await asyncValidation(values, mockData.initialValues, mockData.fieldDefinitions, mockData.mode)
        })

        test('should throw an error if async locale error exists', async() => {
          fetchMock.patch('*', {
            valid: true,
            errors: {}
          })

          const values = {phone_mobile: '....1234'}
          try {
            await asyncValidation(values, mockData.initialValues, mockData.fieldDefinitions, mockData.mode)
          } catch (error) {
            expect(error).to.have.property('phone_mobile')
          }
        })

        test('should throw an Error if not valid with backend request', async() => {
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
          const values = {
            ...mockData.baseFormValues,
            firstname: ''
          }
          try {
            await asyncValidation(values, mockData.initialValues, mockData.fieldDefinitions, mockData.mode)
          } catch (error) {
            expect(error).to.have.property('firstname')
          }
        })

        test('should not throw a request error if other errors exist', async() => {
          fetchMock.mock('*', 404)

          const values = {
            ...mockData.baseFormValues,
            firstname: 'illegal',
            phone_mobile: '1234'
          }

          try {
            await asyncValidation(values, mockData.initialValues, mockData.fieldDefinitions, mockData.mode)
          } catch (error) {
            expect(error).to.have.property('phone_mobile')
            expect(error).to.not.have.property('firstname')
          }
        })
      })
    })
  })
})
