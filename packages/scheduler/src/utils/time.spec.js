import moment from 'moment'

import {getFormattedTime} from './time'

describe('resource-scheduler', () => {
  describe('utils', () => {
    describe('getFormattedTime', () => {
      test('should return time', () => {
        const time = moment('2015-06-17 14:24:36').locale('en')
        const result = getFormattedTime(time)
        expect(result).to.eql('2 PM')
      })

      test('should return 24h time for locale de', () => {
        const time = moment('2015-06-17 14:24:36').locale('de')
        const result = getFormattedTime(time)
        expect(result).to.eql('14')
      })

      test('should return 24h time for locale de 2', () => {
        const time = moment('2015-06-17 08:24:36').locale('de')
        const result = getFormattedTime(time)
        expect(result).to.eql('08')
      })
    })
  })
})
