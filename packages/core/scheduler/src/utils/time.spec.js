import {getFormattedEventTime, getFormattedTime} from './time'

describe('resource-scheduler', () => {
  describe('utils', () => {
    describe('getFormattedTime', () => {
      test('should return time', () => {
        const time = new Date('2015-06-17 14:24:36')
        const result = getFormattedTime('en', time)
        expect(result).to.eql('14')
      })

      test('should return 24h time for locale de', () => {
        const time = new Date('2015-06-17 14:24:36')
        const result = getFormattedTime('de', time)
        expect(result).to.eql('14')
      })

      test('should return 24h time for locale de 2', () => {
        const time = new Date('2015-06-17 08:24:36')
        const result = getFormattedTime('de', time)
        expect(result).to.eql('08')
      })
    })

    describe('getFormattedEventTime', () => {
      const locale = 'de-CH'

      test('should handle same day events', () => {
        const startDate = new Date('2022-06-01 10:00:00')
        const endDate = new Date('2022-06-01 11:30:00')

        const time = getFormattedEventTime(locale, startDate, endDate)

        expect(time).to.eql('1. Juni, 10:00 - 11:30')
      })

      test('should handle multiple day events', () => {
        const startDate = new Date('2022-06-01 10:00:00')
        const endDate = new Date('2022-06-05 11:30:00')

        const time = getFormattedEventTime(locale, startDate, endDate)

        expect(time).to.eql('1. Juni, 10:00 - 5. Juni, 11:30')
      })

      test('should handle multiple day events on same time', () => {
        const startDate = new Date('2022-06-01 10:00:00')
        const endDate = new Date('2022-06-05 10:00:00')

        const time = getFormattedEventTime(locale, startDate, endDate)

        expect(time).to.eql('1. Juni, 10:00 - 5. Juni, 10:00')
      })

      test('should handle 24h times', () => {
        const startDate = new Date('2022-06-01 00:00:00')
        const endDate = new Date('2022-06-05 18:00:00')

        const time = getFormattedEventTime(locale, startDate, endDate)

        expect(time).to.eql('1. Juni, 0:00 - 5. Juni, 18:00')
      })

      test('should handle multiple years events', () => {
        const startDate = new Date('2021-06-01 10:00:00')
        const endDate = new Date('2022-06-05 11:30:00')

        const time = getFormattedEventTime(locale, startDate, endDate)

        expect(time).to.eql('1. Juni 2021, 10:00 - 5. Juni 2022, 11:30')
      })
    })
  })
})
