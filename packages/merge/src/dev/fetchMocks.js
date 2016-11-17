import {utilFetchMocks} from 'tocco-util/dev'

export default function fetchMocks(fetchMock) {
  utilFetchMocks(fetchMock)
  fetchMock.spy()
}
