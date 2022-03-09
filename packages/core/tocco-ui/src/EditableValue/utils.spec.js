import moment from 'moment'

import {getExpectedDate} from './specUtils'
import {
  atMostOne,
  toLocalDateString,
  momentJStoToFlatpickrFormat,
  convertStringToNumber,
  calculateMilliseconds
} from './utils'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('utils', () => {
      describe('atMostOne', () => {
        test('should return null if null given', () => {
          expect(atMostOne(null)).to.be.null
        })

        test('should return null if empty array given', () => {
          expect(atMostOne([])).to.be.null
        })

        test('should return only item if array with one item given', () => {
          expect(atMostOne(['onlyItem'])).to.eql('onlyItem')
        })

        test('should throw an error if array with multiple items given', () => {
          expect(() => atMostOne(['item1', 'item2'])).to.throw('Expected at most one item in array: item1, item2')
        })
      })

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

      describe('momentJStoToFlatpickrFormat', () => {
        test('should return expected flatpickr date string', () => {
          expect(momentJStoToFlatpickrFormat('DD.MM.YYYY')).to.be.eql('d.m.Y')
        })

        test('should return expected flatpickr time string', () => {
          expect(momentJStoToFlatpickrFormat('HH:mm')).to.be.eql('H:i')
        })

        test('should return expected flatpickr string', () => {
          expect(momentJStoToFlatpickrFormat(moment().locale('en')._locale.longDateFormat('L'))).to.be.eql('m/d/Y')
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
