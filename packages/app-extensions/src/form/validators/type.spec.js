import {urlValidator, phoneValidator} from './type'

describe('app-extensions', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('type', () => {
        describe('url', () => {
          test('should not return an error for valid inputs', () => {
            const validValues = [
              'http://www.tocco.ch',
              'https://google.com',
              'ftp://myftp.upload.com'
            ]

            validValues.forEach(validValue => {
              const result = urlValidator(validValue)
              expect(result).to.be.null
            })
          })

          test('should return an error for invalid values', () => {
            const invalidValues = [
              'a',
              'httb://test.com',
              'www gooogle com',
              ' ',
              ''
            ]

            invalidValues.forEach(invalidValue => {
              const result = urlValidator(invalidValue)
              expect(result).to.not.be.null
            })
          })
        })

        describe('phone', () => {
          test('should not return an error for valid inputs', () => {
            const validValues = [
              '+41444005555',
              '+41 44 400 55 55',
              '079 478 22 69'
            ]

            validValues.forEach(validValue => {
              const result = phoneValidator(validValue)
              expect(result).to.be.null
            })
          })

          test('should return an error for invalid inputs', () => {
            const invalidValues = [
              ' ',
              '1',
              '1234',
              '079 478 22 69 88',
              '(541) 754-3010'
            ]

            invalidValues.forEach(invalidValue => {
              const result = phoneValidator(invalidValue)
              expect(result).to.not.be.null
            })
          })

          test('should country', () => {
            expect(phoneValidator('(541) 754-3010', {defaultCountry: 'US'})).to.be.null
          })

          test('should validate agains regex if given', () => {
            const customPhoneRegex = '^\\d{3}$'

            const testData = [
              {number: '1', valid: false},
              {number: '123', valid: true},
              {number: '1234', valid: false},
              {number: '12 ', valid: false},
              {number: '+41444005555', valid: true}
            ]

            testData.forEach(data => {
              const result = phoneValidator(data.number, {customPhoneRegex})

              if (data.valid) {
                expect(result).to.be.null
              } else {
                expect(result).to.not.be.null
              }
            })
          })
        })
      })
    })
  })
})
