import {getExpectedDate} from './specUtils'
import {toLocalDateString, convertStringToNumber, calculateMilliseconds} from './utils'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('utils', () => {
      describe('toLocalDateString', () => {
        test('should return null if null given', () => {
          expect(toLocalDateString(null)).to.be.null
        })

        test('should return null if undefined given', () => {
          expect(toLocalDateString(undefined)).to.be.null
        })

        test('should return first date if 0 given', () => {
          const expectedDate = getExpectedDate('1969-12-31', '1970-01-01', 0)
          expect(toLocalDateString(0)).to.eql(expectedDate)
        })

        test('should return the local date if a UTC date time string is given', () => {
          const localDateString = toLocalDateString('2017-08-20T22:00:00.000Z')
          const expectedDate = getExpectedDate('2017-08-20', '2017-08-21', -120)
          expect(localDateString).to.eql(expectedDate)
        })
      })

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
