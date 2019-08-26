import {mockData, consoleLogger} from 'tocco-util'

import {getCalendarResponse} from './fetchMockHelper'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(packageName, fetchMock, entityStore = defaultStore) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/calendar/types$'),
    require('./data/calendarTypes')
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/calendar/events'),
    (url, opts) => {
      consoleLogger.log('fetchMock: called rest/calendar/events', url, opts)
      return sleep(500).then(() => {
        const body = JSON.parse(opts.body)
        const data = getCalendarResponse(body.calendars, body.start, body.end)
        return {data}
      })
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

  const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks').default
  listFetchMocks('entity-list', fetchMock)

  const simpleFormFetchMocks = require('tocco-scheduler/src/dev/fetchMocks').default
  simpleFormFetchMocks('scheduler', fetchMock, entityStore)

  fetchMock.spy()
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
