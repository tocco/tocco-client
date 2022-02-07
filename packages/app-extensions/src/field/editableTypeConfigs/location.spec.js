import location from './location'

describe('app-extensions', () => {
  describe('field', () => {
    describe('editableTypeConfigs', () => {
      describe('location', () => {
        describe('getEvents', () => {
          describe('onChange', () => {
            const testOnChange = (locationObject, expectedChangeFieldValueCalls) => {
              const formField = {
                locationMapping: {
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
                [['test-form-name', 'admincode2', 'Zürich']]
              ))

            test('should set empty string if location property is null', () =>
              testOnChange(
                {
                  district: null
                },
                [['test-form-name', 'admincode2', '']]
              ))
          })
        })
      })
    })
  })
})
