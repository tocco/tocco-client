import {createUsers} from './entityFactory'

const allEntities = createUsers(1003)

export const createValidateResponse = (url, opts) => {
  console.log('fetchMock: called validate entity', url)
  const fields = {}
  const entity = JSON.parse(opts.body)
  const requiredFields = ['firstname', 'lastname']
  requiredFields.forEach(requiredField => {
    if (!entity.paths[requiredField]) {
      fields[requiredField] = {required: 'Required!', some: 'Another error'}
    }
  })

  return sleep(1000).then(() => ({fields}))
}

export const createEntitiesReponse = (url, opts) => {
  console.log('fetchMock: called fetch entities', url)
  const limit = parseInt(getParameterValue('_limit', url)) || 25
  const offset = parseInt(getParameterValue('_offset', url)) || 0
  const orderBy = getParameterValue('_sort', url)
  const searchTerm = getParameterValue('_search', url)

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
    return wrapEntitiesResponse(allEntities.slice(0, 10))
  }

  return wrapEntitiesResponse(allEntities.slice(offset, offset + limit))
}

export const createCountReponse = (url, opts) => ({'count': allEntities.length})

export const createEntityResponse = (url, opts) => {
  console.log('fetchMock: called fetch entitiy', url, opts)
  const id = url.match(/^.*\/User\/(\d+)/)[1]
  return allEntities[id]
}

export const createEntityUpdateResponse = (url, opts) => {
  console.log('fetchMock: create/update entity', url, opts)
  const entity = opts.body
  allEntities[entity.key] = entity
  return sleep(2000).then(() => (entity))
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getParameterValue = (name, url) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const wrapEntitiesResponse = entities => ({
  metaData: {
    modelName: 'User',
    label: 'Person'
  },
  data: entities
})
