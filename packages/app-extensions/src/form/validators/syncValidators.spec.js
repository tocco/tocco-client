import {
  maxLengthValidator,
  minLengthValidator,
  minNumberValidator,
  maxNumberValidator,
  postPointValidator,
  prePointValidator,
  regexValidator,
  urlValidator,
  emailValidator
} from './syncValidators'

describe('app-extensions', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('model', () => {
        describe('minLengthValidator', () => {
          const MIN_LENGTH = 4
          test('should not return an error for correct values', () => {
            const validValues = [
              '1234',
              'valid input',
              '!@.,'
            ]

            validValues.forEach(validValue => {
              const result = minLengthValidator(validValue, MIN_LENGTH)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              '4',
              '123',
              'asd'
            ]

            invalidValues.forEach(invalidValue => {
              const result = minLengthValidator(invalidValue, MIN_LENGTH)
              expect(result).to.not.be.null
            })
          })
        })

        describe('maxLengthValidator', () => {
          const MAX_LENGTH = 3
          test('should not return an error for correct values', () => {
            const validValues = [
              '123',
              'a',
              '!'
            ]

            validValues.forEach(validValue => {
              const result = maxLengthValidator(validValue, MAX_LENGTH)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              '1234',
              'this is to long'
            ]

            invalidValues.forEach(invalidValue => {
              const result = maxLengthValidator(invalidValue, MAX_LENGTH)
              expect(result).to.not.be.null
            })
          })
        })

        describe('minNumberValidator', () => {
          const MIN_VALUE = 102.5
          test('should not return an error for correct values', () => {
            const validValues = [
              102.5,
              103,
              100000
            ]

            validValues.forEach(validValue => {
              const result = minNumberValidator(validValue, MIN_VALUE)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              102.4,
              102,
              1,
              -1
            ]

            invalidValues.forEach(invalidValue => {
              const result = minNumberValidator(invalidValue, MIN_VALUE)
              expect(result).to.not.be.null
            })
          })
        })

        describe('maxNumberValidator', () => {
          const MAX_VALUE = 99.9
          test('should not return an error for correct values', () => {
            const validValues = [
              99.9,
              9,
              1,
              -1
            ]

            validValues.forEach(validValue => {
              const result = maxNumberValidator(validValue, MAX_VALUE)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              100,
              100.1,
              9999999999999
            ]

            invalidValues.forEach(invalidValue => {
              const result = maxNumberValidator(invalidValue, MAX_VALUE)
              expect(result).to.not.be.null
            })
          })
        })

        describe('postPointValidator', () => {
          const LIMIT = 3
          test('should not return an error for correct values', () => {
            const validValues = [
              1001.123,
              1.251,
              3.3,
              1.0,
              1000
            ]

            validValues.forEach(validValue => {
              const result = postPointValidator(validValue, LIMIT)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              1.1234,
              3.33333333333
            ]

            invalidValues.forEach(invalidValue => {
              const result = postPointValidator(invalidValue, LIMIT)
              expect(result).to.not.be.null
            })
          })
        })

        describe('prePointValidator', () => {
          const LIMIT = 3
          test('should not return an error for correct values', () => {
            const validValues = [
              -1,
              0,
              1.1,
              22,
              99,
              100,
              999.99
            ]

            validValues.forEach(validValue => {
              const result = prePointValidator(validValue, LIMIT)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              1000,
              999999999,
              1000.1
            ]

            invalidValues.forEach(invalidValue => {
              const result = prePointValidator(invalidValue, LIMIT)
              expect(result).to.not.be.null
            })
          })
        })

        describe('regexValidator', () => {
          const PATTERN = '^[0-9]{0,5}$'
          test('should not return an error for correct values', () => {
            const validValues = [
              '1',
              '012',
              '12345',
              ''
            ]

            validValues.forEach(validValue => {
              const result = regexValidator(validValue, PATTERN)
              expect(result).to.be.null
            })
          })

          test('should return an error invalid values', () => {
            const invalidValues = [
              'a',
              '123456'
            ]

            invalidValues.forEach(invalidValue => {
              const result = regexValidator(invalidValue, PATTERN)
              expect(result).to.not.be.null
            })
          })
        })

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
      })
    })
  })
})
