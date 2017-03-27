import {parseLocalDate} from './DateUtils'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('util', () => {
      describe('DateUtils', () => {
        describe('parseLocalDate', () => {
          it('should parse a valid local date string', () => {
            const localDate = parseLocalDate('2017-03-27')

            expect(localDate.getFullYear()).to.be.eql(2017)
            expect(localDate.getMonth()).to.be.eql(2)
            expect(localDate.getDate()).to.be.eql(27)

            expect(localDate.getHours()).to.be.eql(0)
            expect(localDate.getMinutes()).to.be.eql(0)
            expect(localDate.getSeconds()).to.be.eql(0)
            expect(localDate.getMilliseconds()).to.be.eql(0)
          })

          it('should return null if invalid date given', () => {
            const localDate = parseLocalDate('invalid')
            expect(localDate).to.be.null
          })

          it('should return null if no date given', () => {
            const localDate = parseLocalDate(null)
            expect(localDate).to.be.null
          })
        })
      })
    })
  })
})
