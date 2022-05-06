import location from './location'

describe('app-extensions', () => {
  describe('field', () => {
    describe('editableTypeConfigs', () => {
      describe('location', () => {
        describe('getEvents', () => {
          describe('onChange', () => {
            const testOnChange = (locationObject, expectedChangeFieldValueCalls) => {
              const formField = {
                id: 'location',
                locationMapping: {
                  postcode: 'zip',
                  city: 'city',
                  district: 'admincode2'
                }
              }
              const formName = 'test-form-name'
              const changeFieldValue = jest.fn()
              const formData = {
                changeFieldValue
              }

              const {onChange} = location.getEvents({
                formField,
                formName,
                formData
              })
              onChange(locationObject)

              expect(changeFieldValue.mock.calls).to.eql(expectedChangeFieldValueCalls)
            }

            test('should set location property according to location mapping', () =>
              testOnChange(
                {
                  district: 'Zürich'
                },
                [
                  ['test-form-name', 'admincode2', 'Zürich'],
                  ['test-form-name', 'location', {}]
                ]
              ))

            test('should set location property according to location mapping', () =>
              testOnChange(
                {
                  postcode: '1324'
                },
                [
                  ['test-form-name', 'zip', '1324'],
                  [
                    'test-form-name',
                    'location',
                    {
                      postcode: '1324'
                    }
                  ]
                ]
              ))

            test('should set empty string if location property is null', () =>
              testOnChange(
                {
                  city: null
                },
                [
                  ['test-form-name', 'city', ''],
                  [
                    'test-form-name',
                    'location',
                    {
                      city: ''
                    }
                  ]
                ]
              ))
          })
        })
      })
    })
  })
})
