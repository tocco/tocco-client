import {utilFetchMocks} from 'tocco-util/dev'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.sessionFetchMock(fetchMock)
  utilFetchMocks.textResourceFetchMock(fetchMock, require('./messages.json'))
  fetchMock.spy()
}
