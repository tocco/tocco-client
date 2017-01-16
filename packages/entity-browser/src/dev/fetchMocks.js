import {utilFetchMocks} from 'tocco-util/dev'
import {createUsers} from './entityFactory'

const allEntities = createUsers(1003)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.sessionFetchMock(fetchMock)
  utilFetchMocks.textResourceFetchMock(fetchMock, require('./rest-responses/messages.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_search'), require('./rest-responses/form_user_search.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/UserSearch_search'),
    require('./rest-responses/form_user_search.json')
  )
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/UserSearch_detail'),
    require('./rest-responses/form_user_detail.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_detail'), require('./rest-responses/form_user_detail.json')
  )
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_list'), require('./rest-responses/form_user_list.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/UserSearch_list'), require('./rest-responses/form_user_list.json'))

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User_code1.*'), require('./rest-responses/user_code1.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/model.*'), require('./rest-responses/model_user.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/count?.*'), {'count': allEntities.length})
  fetchMock.post(new RegExp('^.*?/nice2/rest/entities/User/[0-9]/validate.*'), (url, opts) => {
    const fields = {}
    const entity = opts.body
    const requiredFields = ['firstname', 'lastname']
    requiredFields.forEach(requiredField => {
      if (!entity.paths[requiredField].value.value
        || entity.paths[requiredField].value.value === '') {
        fields[requiredField] = {required: 'Required!', some: 'Another error'}
      }
    })

    return sleep(1000).then(() => ({fields}))
  })

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/[0-9]?.*'), (url, opts) => {
    console.log('fetchMock: called fetch entitiy', url, opts)
    const id = url.match(/^.*\/User\/(\d+)/)[1]
    return allEntities[id]
  })

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User?.*'), (url, opts) => {
    console.log('fetchMock: called fetch entities', url)
    const limit = parseInt(getParameterByName('_limit', url)) || 25
    const offset = parseInt(getParameterByName('_offset', url)) || 0
    const orderBy = getParameterByName('_sort', url)
    const searchTerm = getParameterByName('_search', url)

    if (orderBy) {
      const parts = orderBy.split(' ')
      const fieldName = parts[0]
      const direction = parts[1]
      allEntities.sort((a, b) => {
        const A = a.paths[fieldName].value.value || 0
        const B = b.paths[fieldName].value.value || 0
        return ((A < B) ? -1 : ((A > B) ? 1 : 0))
      })
      if (direction === 'desc') {
        allEntities.reverse()
      }
    }

    if (searchTerm === 'few') {
      return wrapResponse(allEntities.slice(0, 10))
    }

    return wrapResponse(allEntities.slice(offset, offset + limit))
  })

  fetchMock.spy()
}

const wrapResponse = entities => ({
  metaData: {
    modelName: 'User',
    label: 'Person'
  },
  data: entities
})

const getParameterByName = (name, url) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
