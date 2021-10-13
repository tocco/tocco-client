import {mockData} from 'tocco-util'

const defaultStore = {
  User: mockData.createUsers(100)
}

export default function setupFetchMock(packageName, fetchMock, entityStore = defaultStore) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))
  mockData.setupSystemMock('entity-list', fetchMock, require('../../../entity-list/src/dev/textResources'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/client/dashboard$'),
    require('./data/dashboards')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User/infobox$'),
    require('./data/User_infobox_form')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/client/preferences/User_list*$'),
    require('./data/User_list')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/model$'),
    require('./data/User_model')
  )
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/client/markings$'),
    require('./data/Client_markings')
  )
  
  mockData.setupFetchMock(fetchMock, entityStore)

  fetchMock.spy()
}
