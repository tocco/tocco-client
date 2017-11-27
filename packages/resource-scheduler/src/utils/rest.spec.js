import {transformRequestedCalendars} from './rest'

describe('resource-scheduler', () => {
  describe('utils', () => {
    describe('rest', () => {
      describe('transformRequestedCalendars', () => {
        it('should transform object to array', () => {
          const requestedCalendars = {
            lecturer: ['1', '3', '99'],
            room: ['44']
          }

          const expectedResult = [
            {
              calendarTypeId: 'lecturer',
              keys: ['1', '3', '99']
            },
            {
              calendarTypeId: 'room',
              keys: ['44']
            }
          ]

          const result = transformRequestedCalendars(requestedCalendars)

          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
