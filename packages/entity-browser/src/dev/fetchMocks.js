import {utilFetchMocks} from 'tocco-util/dev'

import {createUsers} from './recordFactory'

const allRecords = createUsers(1003)

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.sessionFetchMock(fetchMock)
  utilFetchMocks.textResourceFetchMock(fetchMock, require('./messages.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_search'), require('./user_search.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/.*'), require('./user_list.json'))

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/.*/count'), {'count': allRecords.length})
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/.*'), (url, opts) => {
    console.log('fetchMock: called fetch entities', url)
    const limit = parseInt(getParameterByName('_limit', url)) || 25
    const offset = parseInt(getParameterByName('_offset', url)) || 0
    const orderBy = getParameterByName('_sort', url)
    const searchTerm = getParameterByName('_search', url)

    if (orderBy) {
      const parts = orderBy.split(' ')
      const fieldName = parts[0]
      const direction = parts[1]
      allRecords.sort((a, b) => {
        const A = a.paths[fieldName].value.value || 0
        const B = b.paths[fieldName].value.value || 0
        return ((A < B) ? -1 : ((A > B) ? 1 : 0))
      })
      if (direction === 'desc') {
        allRecords.reverse()
      }
    }

    if (searchTerm === 'few') {
      return wrapResponse(allRecords.slice(0, 10))
    }

    return wrapResponse(allRecords.slice(offset, offset + limit))
  })

  fetchMock.spy()
}

const wrapResponse = records => ({
  metaData: {
    modelName: 'User',
    label: 'Person'
  },
  data: records
})

const getParameterByName = (name, url) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
