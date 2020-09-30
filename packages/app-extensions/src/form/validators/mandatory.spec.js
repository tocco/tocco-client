import {valueDefined} from './mandatory'

describe('app-extensions', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('mandatory', () => {
        describe('valueDefined', () => {
          test('should return true for defined values', () => {
            const definedValues = [
              123,
              0,
              false,
              -1,
              'abc',
              [1],
              {a: 1}
            ]

            definedValues.forEach(definedValue => {
              const result = valueDefined(definedValue)
              expect(result).to.be.true
            })
          })

          test('should return false for undefined / empty values', () => {
            const undefinedValues = [
              null,
              undefined,
              [],
              {}
            ]

            undefinedValues.forEach(undefinedValue => {
              const result = valueDefined(undefinedValue)
              expect(result).to.be.false
            })
          })
        })
      })
    })
  })
})
