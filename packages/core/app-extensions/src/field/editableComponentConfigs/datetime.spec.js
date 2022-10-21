import datetime from './datetime'

describe('app-extensions', () => {
  describe('field', () => {
    describe('editableComponentConfigs', () => {
      describe('datetime', () => {
        test('should apply custom parsing functions for long type', () => {
          const entityField = {type: 'long'}

          const options = datetime.getOptions({entityField})

          expect(options.datePickerOptions).to.have.property('dateToValue')
          expect(options.datePickerOptions).to.have.property('valueToDate')
        })

        test('should not apply any custom parsing functions for datetime type', () => {
          const entityField = {type: 'datetime'}

          const options = datetime.getOptions({entityField})

          expect(options).to.be.undefined
          expect(options).to.be.undefined
        })

        describe('valueToDate', () => {
          test('should parse long as date', () => {
            const value = 1664179200000
            const options = datetime.getOptions({entityField: {type: 'long'}})

            const date = options.datePickerOptions.valueToDate(value)

            expect(date).to.eql(new Date(2022, 8, 26, 10, 0, 0))
          })

          test('should handle null value', () => {
            const value = null
            const options = datetime.getOptions({entityField: {type: 'long'}})

            const date = options.datePickerOptions.valueToDate(value)

            expect(date).to.eql(null)
          })
        })

        describe('dateToValue', () => {
          test('should convert date to long value', () => {
            const date = new Date(2022, 8, 26, 10, 0, 0)
            const options = datetime.getOptions({entityField: {type: 'long'}})

            const value = options.datePickerOptions.dateToValue(date)

            expect(value).to.eql(1664179200000)
          })

          test('should handle nullable dates', () => {
            const date = null
            const options = datetime.getOptions({entityField: {type: 'long'}})

            const value = options.datePickerOptions.dateToValue(date)

            expect(value).to.eql(null)
          })
        })
      })
    })
  })
})
