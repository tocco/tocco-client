import moment from 'moment'

import rangeTypeMappings from './rangeTypeMappings'

describe('tocco-ui', () => {
  describe('rangeTypeMappings', () => {
    test('should map datetime to date', () => {
      expect(rangeTypeMappings.datetime.type).to.eq('date')
    })

    test('should convert single date value to datetime range', () => {
      const dateValue = '2020-09-24'
      const result = rangeTypeMappings.datetime.toRange(dateValue)
      expect(result.isRangeValue).to.be.true
      expect(moment(result.from, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]', true).isValid()).to.be.true
      expect(moment(result.to, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]', true).isValid()).to.be.true
      expect(moment(dateValue).isSame(result.from)).to.be.true
      expect(moment(result.from).add(1, 'd').isSame(result.to)).to.be.true
    })

    test('should convert datetime range to single from date value', () => {
      const rangeValue = {
        from: '2020-09-24T12:23:34.456Z',
        to: '2020-09-25T12:23:34.456Z'
      }
      const result = rangeTypeMappings.datetime.fromRange(rangeValue)
      expect(result).to.eq('2020-09-24')
    })

    test('should convert datetime range to single to date value', () => {
      const rangeValue = {
        from: null,
        to: '2020-09-25T12:23:34.456Z'
      }
      const result = rangeTypeMappings.datetime.fromRange(rangeValue)
      expect(result).to.eq('2020-09-25')
    })

    test('should convert datetime range to null value', () => {
      const rangeValue = {
        from: null,
        to: null
      }
      const result = rangeTypeMappings.datetime.fromRange(rangeValue)
      expect(result).to.be.null
    })

    test('should set to datetime limitation', () => {
      const dateValue = '2020-09-24'
      const result = rangeTypeMappings.datetime.getToOptions({testValue: 'test'}, dateValue)
      expect(result.testValue).to.eq('test')
      expect(result.flatpickrOptions.minDate).to.be.eq(dateValue)
      expect(result.flatpickrOptions.maxDate).to.be.undefined
    })

    test('should set from datetime limitation', () => {
      const dateValue = '2020-09-24'
      const result = rangeTypeMappings.datetime.getFromOptions({testValue: 'test'}, dateValue)
      expect(result.testValue).to.eq('test')
      expect(result.flatpickrOptions.maxDate).to.be.eq(dateValue)
      expect(result.flatpickrOptions.minDate).to.be.undefined
    })

    test('should set to date limitation', () => {
      const dateValue = '2020-09-24'
      const result = rangeTypeMappings.date.getToOptions({testValue: 'test'}, dateValue)
      expect(result.testValue).to.eq('test')
      expect(result.flatpickrOptions.minDate).to.be.eq(dateValue)
      expect(result.flatpickrOptions.maxDate).to.be.undefined
    })

    test('should set from date limitation', () => {
      const dateValue = '2020-09-24'
      const result = rangeTypeMappings.date.getFromOptions({testValue: 'test'}, dateValue)
      expect(result.testValue).to.eq('test')
      expect(result.flatpickrOptions.maxDate).to.be.eq(dateValue)
      expect(result.flatpickrOptions.minDate).to.be.undefined
    })
  })
})
