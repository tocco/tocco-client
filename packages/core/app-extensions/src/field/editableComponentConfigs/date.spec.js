import date from './date'

describe('app-extensions', () => {
  describe('field', () => {
    describe('editableComponentConfigs', () => {
      describe('date', () => {
        describe('dateToValue', () => {
          test('should return null if null given', () => {
            const options = date.getOptions()

            expect(options.datePickerOptions.dateToValue(null)).to.be.null
          })

          test('should return null if undefined given', () => {
            const options = date.getOptions()

            expect(options.datePickerOptions.dateToValue(undefined)).to.be.null
          })

          test('should return first date if 0 given', () => {
            const options = date.getOptions()

            expect(options.datePickerOptions.dateToValue(new Date(0))).to.eql('1970-01-01')
          })

          test('should return the local date if a UTC date time string is given', () => {
            const options = date.getOptions()

            const localDateString = options.datePickerOptions.dateToValue(new Date('2017-08-20T22:00:00.000Z'))
            expect(localDateString).to.eql('2017-08-21')
          })
        })
      })
    })
  })
})
