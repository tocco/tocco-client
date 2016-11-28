import {utilFetchMocks} from 'tocco-util/dev'

const createRecords = amount => {
  const records = []
  const userTemplate = require('./user_template.json')

  for (let i = 0; i < amount; i++) {
    records.push({
      ...userTemplate,
      key: i,
      fields: {
        ...userTemplate.fields,
        user_nr: {
          type: 'counter',
          value: i
        },
        firstname: {
          value: 'Test' + i,
          type: 'string'
        }
      }
    }
    )
  }
  return records
}

const allRecords = createRecords(1000)

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.sessionFetchMock(fetchMock)
  utilFetchMocks.textResourceFetchMock(fetchMock, require('./messages.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/form/.*?'), require('./user_list.json'))

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/.*/count?'), {'count': 1000})
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/.*?'), (url, opts) => {
    console.log('fetchMock: called  fetch entites', url)
    const limit = parseInt(getParameterByName('_limit', url))
    const offset = parseInt(getParameterByName('_offset', url))

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
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
