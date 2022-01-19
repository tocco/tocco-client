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
          const result = {hours: 25, minutes: 1, seconds: 22}
          const milliSeconds = 90083000
          expect(millisecondsToDuration(milliSeconds)).to.be.eql(result)
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
