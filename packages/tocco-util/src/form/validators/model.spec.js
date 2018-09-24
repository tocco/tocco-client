import {mandatoryValidator, maxLengthValidator, minLengthValidator} from './model'

describe('tocco-util', () => {
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
      })
    })
  })
})
