import {
  formatDuration,
  millisecondsToDuration,
  getLocalizedDateFormat,
  getLocalizedDateFormatWithoutPunctuation,
  getLocalizedDateTimeFormatWithoutPunctuation,
  getLocalizedTimeFormat,
  useTwoDigitYear
} from './utils'

describe('tocco-util', () => {
  describe('date', () => {
    describe('utils', () => {
      describe('millisecondsToDuration', () => {
        test('should return correct time object', () => {
          const result = {hours: 6, minutes: 44, seconds: 3.036}
          const milliSeconds = 24243036
          expect(millisecondsToDuration(milliSeconds)).to.be.eql(result)
        })

        test('should return time object with values zero on undefined input', () => {
          const zeroTimeObject = {hours: '', minutes: '', seconds: ''}
          expect(millisecondsToDuration()).to.be.eql(zeroTimeObject)
        })

        test('should handle hour overflow', () => {
          const result = {hours: 25, minutes: 1, seconds: 23.036}
          const milliSeconds = 90083036
          expect(millisecondsToDuration(milliSeconds)).to.be.eql(result)
        })

        test('should correctly handle tiny values', () => {
          expect(millisecondsToDuration(1)).to.be.eql({hours: 0, minutes: 0, seconds: 0.001})
          expect(millisecondsToDuration(2)).to.be.eql({hours: 0, minutes: 0, seconds: 0.002})
          expect(millisecondsToDuration(3)).to.be.eql({hours: 0, minutes: 0, seconds: 0.003})
        })

        test('should correctly handle negative values (milliseconds)', () => {
          expect(millisecondsToDuration(-3)).to.be.eql({hours: 0, minutes: 0, seconds: -0.003})
        })

        test('should correctly handle negative values (seconds)', () => {
          expect(millisecondsToDuration(-12003)).to.be.eql({hours: 0, minutes: 0, seconds: -12.003})
        })

        test('should correctly handle negative values (minutes)', () => {
          expect(millisecondsToDuration(-1032003)).to.be.eql({hours: 0, minutes: -17, seconds: 12.003})
        })

        test('should correctly handle negative values (hours)', () => {
          expect(millisecondsToDuration(-101832003)).to.be.eql({hours: -28, minutes: 17, seconds: 12.003})
        })
      })

      describe('formatDuration', () => {
        test('should format value with seconds', () => {
          const ms = 83000
          const duration = '00:01:23.000'
          expect(formatDuration(ms)).to.equal(duration)
        })
        test('should format value with seconds & milliseconds', () => {
          const ms = 63123

          const duration = '00:01:03.123'
          expect(formatDuration(ms)).to.equal(duration)
        })
        test('should format value w/o seconds', () => {
          const ms = 120000

          const duration = '00:02'
          expect(formatDuration(ms)).to.equal(duration)
        })
      })

      describe('getLocalizedDateFormat', () => {
        test('should return P format for de-CH', () => {
          const format = getLocalizedDateFormat('de-CH')

          expect(format).to.eql('dd.MM.y')
        })

        test('should return P format for en', () => {
          const format = getLocalizedDateFormat('en')

          expect(format).to.eql('MM/dd/yyyy')
        })
      })

      describe('getLocalizedTimeFormat', () => {
        test('should return p format for de-CH', () => {
          const format = getLocalizedTimeFormat('de-CH')

          expect(format).to.eql('HH:mm')
        })

        test('should return p format for en', () => {
          const format = getLocalizedTimeFormat('en')

          expect(format).to.eql('h:mm a')
        })
      })

      describe('getLocalizedDateFormatWithoutPunctuation', () => {
        test('should return P format for de-CH without any dots', () => {
          const format = getLocalizedDateFormatWithoutPunctuation('de-CH')

          expect(format).to.eql('ddMMy')
        })

        test('should return P format for en without any slashes', () => {
          const format = getLocalizedDateFormatWithoutPunctuation('en')

          expect(format).to.eql('MMddyyyy')
        })
      })

      describe('getLocalizedDateTimeFormatWithoutPunctuation', () => {
        test('should return Pp format for de-CH without any dots and colons', () => {
          const format = getLocalizedDateTimeFormatWithoutPunctuation('de-CH')

          expect(format).to.eql('ddMMy HHmm')
        })

        test('should return Pp format for en without any slashes and colons', () => {
          const format = getLocalizedDateTimeFormatWithoutPunctuation('en')

          expect(format).to.eql('MMddyyyy hmm a')
        })
      })

      describe('useTwoDigitYear', () => {
        test('should replace any year format with two year format', () => {
          expect(useTwoDigitYear('dd.MM.yyyy')).to.eql('dd.MM.yy')
          expect(useTwoDigitYear('dd.MM.y')).to.eql('dd.MM.yy')
          expect(useTwoDigitYear('ddMMy')).to.eql('ddMMyy')
          expect(useTwoDigitYear('MM/dd/yyyy')).to.eql('MM/dd/yy')
          expect(useTwoDigitYear('MMddyyyy')).to.eql('MMddyy')
          expect(useTwoDigitYear('dd.MM.y HH:mm')).to.eql('dd.MM.yy HH:mm')
          expect(useTwoDigitYear('MMddyyyy hmm a')).to.eql('MMddyy hmm a')
        })
      })
    })
  })
})
