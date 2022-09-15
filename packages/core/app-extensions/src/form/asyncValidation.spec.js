import fetchMock from 'fetch-mock'
import {SubmissionError} from 'redux-form/es/SubmissionError'
import {env} from 'tocco-util'

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
  formDefinition: {},
  mode: 'update',
  entityName: 'User',
  entityId: '1'
}

describe('app-extensions', () => {
  beforeEach(() => {
    fetchMock.reset()
    fetchMock.restore()
    env.setWidgetConfigKey(undefined)
  })
  describe('form', () => {
    describe('asyncValidation', () => {
      describe('submitValidate', () => {
        test('should not throw an error if valid', async () => {
          fetchMock.patch('*', {
            valid: true,
            errors: {}
          })
          const values = {
            ...mockData.baseFormValues,
            firstname: ''
          }

          await submitValidation(values, mockData.initialValues, [], mockData.formDefinition, mockData.mode)
        })

        test('should not throw an error if user has no permission', async () => {
          fetchMock.mock('*', 403)
          const values = {
            ...mockData.baseFormValues,
            firstname: ''
          }

          await submitValidation(values, mockData.initialValues, [], mockData.formDefinition, mockData.mode)
        })

        test('should throw a SubmissionError', async () => {
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
            await submitValidation(formValues, mockData.initialValues, [], mockData.formDefinition, mockData.mode)
          } catch (err) {
            expect(err).to.be.instanceof(SubmissionError)
            expect(err.errors).to.have.property('firstname')
          }
        })

        test('should map virtual form values', async () => {
          fetchMock.patch('*', {valid: true, errors: {}}).spy()

          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]
          const values = {
            ...mockData.baseFormValues,
            location: {
              postcode: '1234'
            }
          }

          const expectedEntity = {
            model: 'User',
            key: '1',
            paths: {
              zip: '1234'
            }
          }

          await submitValidation(
            values,
            mockData.initialValues,
            fieldDefinitions,
            mockData.formDefinition,
            mockData.mode
          )

          expect(fetchMock.calls().length).to.equal(1)
          expect(
            fetchMock.called('begin:/nice2/rest/entities/2.0/User/1?_validate=true', {
              method: 'PATCH',
              body: expectedEntity
            })
          ).to.be.true
        })

        test('should map virtual form values', async () => {
          fetchMock.patch('*', {valid: true, errors: {}}).spy()

          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]
          const values = {
            ...mockData.baseFormValues,
            location: {
              postcode: '1234'
            },
            zip: '1234'
          }

          const expectedEntity = {
            model: 'User',
            key: '1',
            paths: {
              zip: '1234'
            }
          }

          await submitValidation(
            values,
            mockData.initialValues,
            fieldDefinitions,
            mockData.formDefinition,
            mockData.mode
          )

          expect(fetchMock.calls().length).to.equal(1)
          expect(
            fetchMock.called('begin:/nice2/rest/entities/2.0/User/1?_validate=true', {
              method: 'PATCH',
              body: expectedEntity
            })
          ).to.be.true
        })

        test('should map errors for virutal form fields', async () => {
          fetchMock.patch('*', {
            valid: false,
            errors: [
              {
                key: '1',
                model: 'User',
                paths: {
                  zip: {
                    mandatory: ['Field required!']
                  }
                }
              }
            ]
          })

          const fieldDefinitions = [
            {
              id: 'location',
              componentType: 'field',
              dataType: 'location',
              locationMapping: {
                postcode: 'zip'
              }
            }
          ]
          const formValues = {
            ...mockData.baseFormValues
          }
          try {
            await submitValidation(
              formValues,
              mockData.initialValues,
              fieldDefinitions,
              mockData.formDefinition,
              mockData.mode
            )
          } catch (err) {
            expect(err).to.be.instanceof(SubmissionError)
            expect(err.errors).to.have.property('location')
          }
        })

        describe('custom endpoints', () => {
          const mode = 'create'
          const initialValues = {
            __model: 'User',
            firstname: ''
          }
          const formDefinition = {
            createEndpoint: 'test/customEndpoint'
          }

          test('no custom endpoint defined and without widget config key', async () => {
            fetchMock.post('*', {valid: true}).spy()

            await submitValidation(
              initialValues,
              initialValues,
              mockData.fieldDefinitions,
              mockData.formDefinition,
              mode
            )

            expect(fetchMock.calls().length).to.equal(1)
            expect(
              fetchMock.called('begin:/nice2/rest/entities/2.0/User?_validate=true', {
                method: 'POST'
              })
            ).to.be.true
          })

          test('no custom endpoint defined and with widget config key', async () => {
            fetchMock.post('*', {valid: true}).spy()
            env.setWidgetConfigKey('1')

            await submitValidation(
              initialValues,
              initialValues,
              mockData.fieldDefinitions,
              mockData.formDefinition,
              mode
            )

            expect(fetchMock.calls().length).to.equal(1)
            expect(
              fetchMock.called('begin:/nice2/rest/entities/2.0/User?_validate=true&_widget_key=1', {
                method: 'POST'
              })
            ).to.be.true
          })

          test('custom endpoint defined and with widget config key', async () => {
            fetchMock.post('*', {valid: true}).spy()
            env.setWidgetConfigKey('1')

            await submitValidation(initialValues, initialValues, mockData.fieldDefinitions, formDefinition, mode)

            expect(fetchMock.calls().length).to.equal(1)
            expect(
              fetchMock.called('begin:/nice2/rest/test/customEndpoint?_validate=true&_widget_key=1', {
                method: 'POST'
              })
            ).to.be.true
          })

          test('custom endpoint defined and without widget config key', async () => {
            fetchMock.post('*', {valid: true}).spy()

            await submitValidation(initialValues, initialValues, mockData.fieldDefinitions, formDefinition, mode)

            expect(fetchMock.calls().length).to.equal(1)
            expect(
              fetchMock.called('begin:/nice2/rest/test/customEndpoint?_validate=true', {
                method: 'POST'
              })
            ).to.be.true
          })
        })
      })

      describe('asyncValidate', () => {
        test('should not throw an error if valid with backend request', async () => {
          fetchMock.patch('*', {
            valid: true,
            errors: {}
          })

          const values = {phone_mobile: '+41444005555'}
          await asyncValidation(
            values,
            mockData.initialValues,
            mockData.fieldDefinitions,
            mockData.formDefinition,
            mockData.mode
          )
        })

        test('should throw an error if async locale error exists', async () => {
          fetchMock.patch('*', {
            valid: true,
            errors: {}
          })

          const values = {phone_mobile: '....1234'}
          try {
            await asyncValidation(
              values,
              mockData.initialValues,
              mockData.fieldDefinitions,
              mockData.formDefinition,
              mockData.mode
            )
          } catch (error) {
            expect(error).to.have.property('phone_mobile')
          }
        })

        test('should throw an Error if not valid with backend request', async () => {
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
            await asyncValidation(
              values,
              mockData.initialValues,
              mockData.fieldDefinitions,
              mockData.formDefinition,
              mockData.mode
            )
          } catch (error) {
            expect(error).to.have.property('firstname')
          }
        })

        test('should not throw a request error if other errors exist', async () => {
          fetchMock.mock('*', 404)

          const values = {
            ...mockData.baseFormValues,
            firstname: 'illegal',
            phone_mobile: '1234'
          }

          try {
            await asyncValidation(
              values,
              mockData.initialValues,
              mockData.fieldDefinitions,
              mockData.formDefinition,
              mockData.mode
            )
          } catch (error) {
            expect(error).to.have.property('phone_mobile')
            expect(error).to.not.have.property('firstname')
          }
        })
      })

      test('should trow a general outdated error if validation call return a 412', async () => {
        fetchMock.mock('*', {
          status: 412,
          message: 'Version of entity User_status with key 2 is outdated. Given version: 111, Current version: 3',
          errorCode: 'OUTDATED_ENTITY',
          updateUser: 'api',
          updateTimestamp: '2021-07-27T14:15:18.220Z',
          model: 'User_status',
          key: '2'
        })

        const values = {}

        try {
          await asyncValidation(
            values,
            mockData.initialValues,
            mockData.fieldDefinitions,
            mockData.formDefinition,
            mockData.mode
          )
        } catch (error) {
          expect(error).to.have.property('_error')
          expect(error._error).to.have.property('outdatedError')
        }
      })
    })
  })
})
