import {utilFetchMocks} from 'tocco-util/dev'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.sessionFetchMock(fetchMock)
  utilFetchMocks.textResourceFetchMock(fetchMock, require('./messages.json'))
  
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User$'), require('./users.json'))

  fetchMock.spy()
}
