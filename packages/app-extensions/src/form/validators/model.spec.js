import {
  mandatoryValidator,
  maxLengthValidator,
  minLengthValidator,
  maxNumberValidator,
  postPointValidator
} from './model'

describe('app-extensions', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('model', () => {
        describe('mandatoryValidator', () => {
          test('should not return an error for valid inputs', () => {
            const validValues = [
              'Test',
              0,
              99,
              {key: 99}
            ]

            validValues.forEach(validValue => {
              let result = mandatoryValidator(validValue, true)
              expect(result).to.be.null
              result = mandatoryValidator(validValue, false)
              expect(result).to.be.null
            })
          })

          test('should return an error for invalid values', () => {
            const invalidValues = [
              undefined,
              '',
              null,
              [],
              {}
            ]

            invalidValues.forEach(invalidValue => {
              let result = mandatoryValidator(invalidValue, true)
              expect(result).to.not.be.null
              result = mandatoryValidator(invalidValue, false)
              expect(result).to.be.null
            })
          })
        })

        describe('minLength', () => {
          test('should not return an error for correct values', () => {
            const MIN_LENGTH = 4
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

          test('should return an error for to short values', () => {
            const MIN_LENGTH = 4

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

        describe('maxLength', () => {
          test('should not return an error for correct values', () => {
            const MAX_LENGTH = 3
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

          test('should return an error for to short values', () => {
            const MAX_LENGTH = 3

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
        describe('maxNumberValidator', () => {
          test('should not return an error for submaximal values', () => {
            const MAX_VALUE = 999999999999.99
            const validValue = 123456.21

            const result = maxNumberValidator(validValue, MAX_VALUE)
            expect(result).to.be.null
          })

          test('should return an error for too large values', () => {
            const MAX_VALUE = 999999999999.99
            const invalidValue = 9999999999991

            const result = maxNumberValidator(invalidValue, MAX_VALUE)
            expect(result).to.not.be.null
          })
        })

        describe('postPointValidator', () => {
          test('should not return an error for submaximal decimal values', () => {
            const MAX_DIGITS = 2
            const validValue = 6.2

            const result = postPointValidator(validValue, MAX_DIGITS)
            expect(result).to.be.null
          })

          test('should return an error for too large decimal values', () => {
            const MAX_DIGITS = 2
            const invalidValue = 6.1234

            const result = postPointValidator(invalidValue, MAX_DIGITS)
            expect(result).to.not.be.null
          })

          test('should return null for integer', () => {
            const MAX_DIGITS = 2
            const validValue = 333

            const result = postPointValidator(validValue, MAX_DIGITS)
            expect(result).to.be.null
          })
        })
      })
    })
  })
})
