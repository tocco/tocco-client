import {
  formatTQLDatetime,
  formatTQLTime,
  parseAsStartOfDayInLocalTime,
  parseDateOnlyInLocalTime,
  parseInLocalTime,
  parseTime
} from './utils'

describe('tocco-util', () => {
  describe('tqlBuilder', () => {
    describe('utils', () => {
      describe('parseDateOnlyInLocalTime', () => {
        test('should parse date only string as local instead of UTC (winter time)', () => {
          const dateOnlyString = '2022-01-05'

          const date = parseDateOnlyInLocalTime(dateOnlyString)

          expect(date.toISOString()).to.eql('2022-01-04T23:00:00.000Z')
        })

        test('should parse date only string as local instead of UTC (summer time)', () => {
          const dateOnlyString = '2022-05-05'

          const date = parseDateOnlyInLocalTime(dateOnlyString)

          expect(date.toISOString()).to.eql('2022-05-04T22:00:00.000Z')
        })
      })

      describe('parseAsStartOfDayInLocalTime', () => {
        test('should parse date only string as local and use correct start time of day', () => {
          const dateOnlyString = '2022-01-05'

          const date = parseAsStartOfDayInLocalTime(dateOnlyString)

          expect(date.toISOString()).to.eql('2022-01-04T23:00:00.000Z')
        })

        test('should parse UTC string as local and use correct start time of day', () => {
          const dateUTCString = '2022-05-04T23:00:00.000Z'

          const date = parseAsStartOfDayInLocalTime(dateUTCString)

          expect(date.toISOString()).to.eql('2022-05-04T22:00:00.000Z')
        })
      })

      describe('parseInLocalTime', () => {
        test('should parse date only string as local time', () => {
          const dateOnlyString = '2022-01-05'

          const date = parseInLocalTime(dateOnlyString)

          expect(date.toISOString()).to.eql('2022-01-04T23:00:00.000Z')
        })

        test('should parse date and time string as local time', () => {
          const dateAndTimeString = '2022-01-05 13:00'

          const date = parseInLocalTime(dateAndTimeString)

          expect(date.toISOString()).to.eql('2022-01-05T12:00:00.000Z')
        })

        test('should parse UTC string as local time', () => {
          const dateUTCString = '2022-01-04T12:00:00.000Z'

          const date = parseInLocalTime(dateUTCString)

          expect(date.toISOString()).to.eql('2022-01-04T12:00:00.000Z')
        })

        test('should parse datetime string with timezone as local time', () => {
          const dateTimezoneString = '2022-01-04T14:00:00.000+02:00'

          const date = parseInLocalTime(dateTimezoneString)

          expect(date.toISOString()).to.eql('2022-01-04T12:00:00.000Z')
        })
      })

      describe('parseTime', () => {
        test('should parse time only string for todays date', () => {
          const timeOnlyString = '13:00'

          const date = parseTime(timeOnlyString)

          const today = new Date()
          today.setHours(13, 0, 0, 0)
          expect(date.toISOString()).to.eql(today.toISOString())
        })
      })

      describe('formatTQLDatetime', () => {
        test('should format date in TQL UTC date time format', () => {
          const date = new Date(2022, 5, 20, 13, 30, 0, 0)

          const tqlString = formatTQLDatetime(date)

          expect(tqlString).to.eql('2022-06-20 11:30')
        })

        test('should parse local date time string and format in TQL UTC format', () => {
          const dateString = '2022-06-20 13:30'

          const tqlString = formatTQLDatetime(parseInLocalTime(dateString))

          expect(tqlString).to.eql('2022-06-20 11:30')
        })

        test('should parse local date only string and format in TQL UTC format', () => {
          const dateString = '2022-06-20'

          const tqlString = formatTQLDatetime(parseInLocalTime(dateString))

          expect(tqlString).to.eql('2022-06-19 22:00')
        })
      })

      describe('formatTQLTime', () => {
        test('should format time in TQL local time format', () => {
          const date = new Date(2022, 5, 20, 13, 30, 0, 0)

          const tqlString = formatTQLTime(date)

          expect(tqlString).to.eql('13:30:00.000')
        })

        test('should format time in TQL local time format', () => {
          const timeString = '12:30'

          const tqlString = formatTQLTime(parseTime(timeString))

          expect(tqlString).to.eql('12:30:00.000')
        })
      })
    })
  })
})
