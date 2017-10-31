import {utilFetchMocks, mockData, consoleLogger} from 'tocco-util'
import {getCalendarResponse} from './fetchMockHelper'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(fetchMock, entityStore = defaultStore) {
  utilFetchMocks.log(fetchMock)
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/calendar/types$'),
    require('./data/calendarTypes')
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/calendar/events'),
    (url, opts) => {
      consoleLogger.log('fetchMock: called rest/calendar/events', url, opts)
      const body = JSON.parse(opts.body)
      const data = getCalendarResponse(body.calendars, body.start, body.end)
      return {data}
    }
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/UserCalendar_list$'),
    mockData.data.userListSmallForm
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/UserCalendar_search$'),
    mockData.data.userSearchForm
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/DummyCalendar_list$'),
    mockData.data.dummyEntityListForm
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/DummyCalendar_search$'),
    mockData.data.dummyEntitySearchForm
  )

  mockData.setupFetchMock(fetchMock, entityStore)

  const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks')
  listFetchMocks(fetchMock)

  fetchMock.spy()
}

module.exports = setupFetchMock
