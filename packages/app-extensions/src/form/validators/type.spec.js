import {
  emailValidator,
  phoneValidator,
  urlValidator
} from './type'

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

        describe('email', () => {
          test('should not return error on valid inputs', () => {
            const validValues = [
              'abc@tocco.ch',
              'a.beta@te.cz',
              'c@c.it'
            ]

            validValues.forEach(validValue => {
              const result = emailValidator(validValue)
              expect(result).to.be.null
            })
          })

          test('should return an error for invalid values', () => {
            const invalidValues = [
              'a..beta@te.cz',
              'tocco.ch',
              'c@c.i',
              ' '
            ]

            invalidValues.forEach(invalidValue => {
              const result = emailValidator(invalidValue)
              expect(result).to.not.be.null
            })
          })
        })

        describe('phone', () => {
          test('should not return an error for valid inputs', async() => {
            const validValues = [
              '+41444005555',
              '+41 44 400 55 55',
              '079 478 22 69'
            ]

            for (let i; i < validValues.length; i++) {
              const result = await phoneValidator(validValues[i])
              expect(result).to.be.null
            }
          })

          test('should return an error for invalid inputs', async() => {
            const invalidValues = [
              ' ',
              '1',
              '1234',
              '079 478 22 69 88',
              '(541) 754-3010'
            ]

            for (let i; i < invalidValues.length; i++) {
              const result = await phoneValidator(invalidValues[i])
              expect(result).to.not.be.null
            }
          })

          test('should country', async() => {
            expect(await phoneValidator('(541) 754-3010', {defaultCountry: 'US'})).to.be.null
          })

          test('should validate agains regex if given', async() => {
            const customPhoneRegex = '^\\d{3}$'

            const testData = [
              {number: '1', valid: false},
              {number: '123', valid: true},
              {number: '1234', valid: false},
              {number: '12 ', valid: false},
              {number: '+41444005555', valid: true}
            ]

            for (let i; i < testData.length; i++) {
              const result = await phoneValidator(testData[i].number, {customPhoneRegex})

              if (testData[i].valid) {
                expect(result).to.be.null
              } else {
                expect(result).to.not.be.null
              }
            }
          })
        })
      })
    })
  })
})
