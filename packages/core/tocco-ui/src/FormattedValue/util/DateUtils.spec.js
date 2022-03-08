import {matchesIsoDate, parseIsoDate} from './DateUtils'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('util', () => {
      describe('DateUtils', () => {
        describe('matchesIsoDate', () => {
          test('should return true if date string is valid', () => {
            expect(matchesIsoDate('2017-03-27')).to.be.true
          })

          test('should return false if date string is invalid', () => {
            expect(matchesIsoDate('invalid')).to.be.false
          })

          test('should return false if no date string given', () => {
            expect(matchesIsoDate(null)).to.be.false
          })
        })

        describe('parseIsoDate', () => {
          test('should parse a valid date string', () => {
            const date = parseIsoDate('2017-03-27')

            expect(date.getFullYear()).to.be.eql(2017)
            expect(date.getMonth()).to.be.eql(2)
            expect(date.getDate()).to.be.eql(27)

            expect(date.getHours()).to.be.eql(0)
            expect(date.getMinutes()).to.be.eql(0)
            expect(date.getSeconds()).to.be.eql(0)
            expect(date.getMilliseconds()).to.be.eql(0)
          })

          test('should return null if invalid date given', () => {
            const date = parseIsoDate('invalid')
            expect(date).to.be.null
          })

          test('should return null if no date given', () => {
            const date = parseIsoDate(null)
            expect(date).to.be.null
          })
        })
      })
    })
  })
})
