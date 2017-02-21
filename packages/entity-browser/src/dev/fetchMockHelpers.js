import {createUsers} from './entityFactory'

const allEntities = createUsers(1003)

export const createValidateResponse = (url, opts) => {
  console.log('fetchMock: called validate entity', url)

  const entity = JSON.parse(opts.body)

  if (entity.paths.firstname === 'illegal1') {
    return {throws: new Error('mock validation error')}
  }

  let resultBody = {
    valid: true
  }

  if (entity.paths.firstname === 'illegal') {
    resultBody = {
      valid: false,
      errors: [{
        model: entity.model,
        key: entity.key,
        paths: {
          firstname: {
            illegal: ['ASYNC VALIDATE: Firstname should not be "illegal"!', 'illegal'],
            other: ['ASYNC VALIDATE: A sencond error']
          }
        }
      }]
    }
  }

  if (entity.paths.firstname === 'illegal0') {
    resultBody = {
      valid: false,
      errors: [{
        model: 'User_status',
        key: '3',
        paths: {
          label_de: {
            mandatory: ['Pflichtfeld ist nicht ausgefüllt.']
          }
        }
      }]
    }
  }

  return sleep(1000).then(() => (resultBody))
}

export const createEntitiesResponse = (url, opts) => {
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

export const createCountResponse = (url, opts) => ({'count': allEntities.length})

export const createEntityResponse = (url, opts) => {
  console.log('fetchMock: called fetch entitiy', url, opts)
  const id = url.match(/^.*\/User\/(\d+)/)[1]
  return allEntities[id]
}

export const createEntityUpdateResponse = (url, opts) => {
  console.log('fetchMock: create/update entity', url, opts)
  const entity = JSON.parse(opts.body)

  if (entity.paths.firstname && (entity.paths.firstname === 'illegal2' || entity.paths.firstname === 'illegal3')) {
    const result = {
      errorCode: entity.paths.firstname === 'illegal2' ? 'VALIDATION_FAILED' : 'NOT_ACCEPTED',
      errors: [{
        model: entity.model,
        key: entity.key,
        paths: {
          firstname: {
            illegal: ['SUBMIT ERROR: Firstname should not be "illegal2".']
          }
        }
      }, {
        model: 'User_status',
        key: '3',
        paths: {
          label_de: {
            mandatory: ['Pflichtfeld ist nicht ausgefüllt.']
          }
        }
      }]
    }
    const body = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'})
    return sleep(1000).then(() => (new Response(body, {'status': 400})))
  }

  const oldEntity = allEntities[entity.key]

  const updatedEntity = {
    ...oldEntity,
    entity: entity.version + 1
  }

  Object.keys(entity.paths).forEach(field => {
    updatedEntity.paths[field].value.value = entity.paths[field]
  })

  allEntities[entity.key] = updatedEntity
  return sleep(1000).then(() => (updatedEntity))
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
