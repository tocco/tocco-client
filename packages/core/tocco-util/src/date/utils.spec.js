import {formatDuration, millisecondsToDuration} from './utils'

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
    })
  })
})
