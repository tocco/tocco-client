import {getEvents, getResources} from './utils'

const mockCalendars = [

  {
    label: 'Peter Griffin',
    model: 'User',
    id: '89',
    calendarType: 'participant',
    events: [
      {
        label: 'English 1',
        start: '2017-10-17T07:52:29.592Z',
        end: '2017-10-17T08:52:29.592Z',
        description: 'Description of event'
      },
      {
        label: 'English 2',
        start: '2017-10-17T10:52:29.592Z',
        end: '2017-10-17T11:52:29.592Z',
        description: 'Description of event'
      }
    ]
  },
  {
    label: 'Paul Panzer',
    model: 'User',
    id: '812',
    calendarType: 'participant',
    events: [
      {
        label: 'English 1',
        start: '2017-10-17T07:52:29.592Z',
        end: '2017-10-17T08:52:29.592Z',
        description: 'Description of event'
      }
    ]
  }
]

describe('scheduler', () => {
  describe('components', () => {
    describe('Scheduler', () => {
      describe('utils', () => {
        it('shoud find a coresponding resource for each event', () => {
          const events = getEvents(mockCalendars)
          const resources = getResources(mockCalendars)

          events.map(event => {
            expect(resources.filter(resource => resource.id === event.resourceId)).to.have.length(1)
          })
        })

        describe('getEvents', () => {
          it('should return events from all calendars with needed properties', () => {
            const events = getEvents(mockCalendars)
            expect(events).to.have.length(3)

            events.map(event => {
              expect(event).to.have.property('resourceId')
              expect(event).to.have.property('title')
              expect(event).to.have.property('start')
              expect(event).to.have.property('end')
            })
          })
        })

        describe('getResources', () => {
          it('should return resources with needed properties', () => {
            const resources = getResources(mockCalendars)
            expect(resources).to.have.length(2)

            resources.map(resource => {
              expect(resource).to.have.property('id')
              expect(resource).to.have.property('title')
              expect(resource).to.have.property('entityId')
              expect(resource).to.have.property('calendarType')
            })
          })
        })
      })
    })
  })
})
