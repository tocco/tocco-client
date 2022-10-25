import {convertStringToNumber, calculateMilliseconds} from './utils'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('utils', () => {
      describe('convertStringToNumber', () => {
        test('should return float number', () => {
          const result = 123456.78
          expect(convertStringToNumber('123456.78')).to.be.eql(result)
        })
        test('should return null on invalid numberString', () => {
          expect(convertStringToNumber('12s3s5g6.78')).to.be.eql(null)
        })
        test('should return null on object as input', () => {
          expect(convertStringToNumber({})).to.be.eql(null)
        })
      })

      describe('calculateMilliseconds', () => {
        test('should return float number', () => {
          const result = 24240000
          expect(calculateMilliseconds(6, 44)).to.be.eql(result)
        })
        test('should only return hours', () => {
          const result = 21600000
          expect(calculateMilliseconds(6, undefined)).to.be.eql(result)
        })
        test('should return null on object as input', () => {
          const result = 2640000
          expect(calculateMilliseconds(undefined, 44)).to.be.eql(result)
        })
        test('should return null on null input', () => {
          const result = null
          expect(calculateMilliseconds(null, null)).to.be.eql(result)
        })
        test('should return hours on null minutes input', () => {
          const result = 25200000
          expect(calculateMilliseconds(7, null)).to.be.eql(result)
        })
      })
    })
  })
})
