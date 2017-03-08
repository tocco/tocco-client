import {convertDateToUTC} from './DateUtils'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('DateUtils', () => {
      it('should convert a date to the UTC timezone', () => {
        const date = new Date('Tue Feb 28 2017 10:00:00 GMT+0100 (CET)')
        const dateUTC = convertDateToUTC(date)
        const localTimezoneOffset = new Date().getTimezoneOffset() * 60000
        expect(dateUTC).to.be.eql(new Date(date.getTime() + localTimezoneOffset))
      })
    })
  })
})
