import _sample from 'lodash/sample'
import Moment from 'moment'

const getRandomNumber = limit => Math.floor(Math.random() * (limit + 1))

const getRandomDate = (start, end, startHour, endHour) => {
  const date = new Date(+start + Math.random() * (end - start))
  const hour = startHour + Math.random() * (endHour - startHour) | 0
  date.setHours(hour)
  return date
}

const addRandomHoursToDate = (date, maxHours) =>
  new Moment(date).add(Math.floor((Math.random() * maxHours) + 1), 'h').toDate()

const conflicts = ['none', 'accepted', 'existing']
const eventsNamePart1 = ['Lecture', 'Class', 'Exercise']
const eventsNamePart2 = ['english', 'IT', 'business administration']
const eventsNamePart3 = ['1', '2', 'master']
const getRandomEventTitle = () => `${_sample(eventsNamePart1)} ${_sample(eventsNamePart2)} ${_sample(eventsNamePart3)}`

const getRandomEvent = (startRange, endRange) => {
  const start = getRandomDate(startRange, endRange, 8, 14)
  return {
    label: getRandomEventTitle(),
    start: start.getTime(),
    end: addRandomHoursToDate(start, 8).getTime(),
    description: 'Description of event',
    isDateTime: 'yes',
    source: {model: 'Calendar_event', key: `${getRandomNumber(1000)}`},
    conflict: _sample(conflicts)
  }
}

const eventFactory = (amount, startRange, endRange) => {
  const events = []
  for (let i = 0; i < amount; i++) {
    events.push(getRandomEvent(startRange, endRange))
  }
  return events
}

const getModel = calendarType => calendarType === 'dummy' ? 'Dummy_entity' : 'User'

export const getCalendarResponse = (requestedCalendars, startDate, endDate) => {
  const amountOfDays = Moment(endDate).diff(Moment(startDate), 'days')

  return requestedCalendars.reduce(
    (accumulator, currentValue) => {
      const {keys, calendarTypeId} = currentValue

      const calendars = keys.map(key => (
        {
          label: `${getModel(calendarTypeId)} ${key}`,
          model: getModel(calendarTypeId),
          key,
          calendarType: calendarTypeId,
          events: eventFactory(amountOfDays, new Date(startDate), new Date(endDate))
        }))
      return [...accumulator, ...calendars]
    }, [])
}
