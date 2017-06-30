import {consoleLogger} from 'tocco-util'
import {createUsers, createDummyEntity} from './entityFactory'

const entityStore = {
  user: createUsers(1003),
  dummy: createDummyEntity(20)
}

export const createValidateResponse = (url, opts) => {
  consoleLogger.log('fetchMock: called validate entity', url)

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

export const createEntitiesResponse = entityName => {
  const entities = entityStore[entityName]

  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch entities', url)
    const limit = parseInt(getParameterValue('_limit', url)) || 25
    const offset = parseInt(getParameterValue('_offset', url)) || 0
    const orderBy = getParameterValue('_sort', url)
    const searchTerm = getParameterValue('_search', url)

    if (orderBy) {
      const parts = orderBy.split(' ')
      const fieldName = parts[0]
      const direction = parts[1]
      entities.sort((a, b) => {
        const A = a.paths[fieldName].value.value || 0
        const B = b.paths[fieldName].value.value || 0
        return ((A < B) ? -1 : ((A > B) ? 1 : 0))
      })
      if (direction === 'desc') {
        entities.reverse()
      }
    }

    if (searchTerm === 'few') {
      return wrapEntitiesResponse(entities.slice(0, 10))
    }

    return sleep(1000).then(() => (wrapEntitiesResponse(entities.slice(offset, offset + limit))))
  }
}

export const createCountResponse = entityName => (url, opts) => ({'count': entityStore[entityName].length})

export const createEntityResponse = entityName => {
  const entities = entityStore[entityName]

  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch entity', url, opts)
    const id = url.match(/^.*\/[A-Z][A-Za-z0-9_]*\/(\d+)/)[1]
    return entities[id]
  }
}

export const createEntityUpdateResponse = (url, opts) => {
  consoleLogger.log('fetchMock: create/update entity', url, opts)
  const body = JSON.parse(opts.body)

  const clientAnswers = body.clientAnswers ? body.clientAnswers : null
  const entity = body.payload ? body.payload : body

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

  if (entity.paths.firstname === 'confirm' && !(clientAnswers && clientAnswers['confirm'] === true)) {
    const result = {
      clientQuestion: {
        id: 'confirm',
        handler: 'ConfirmQuestionHandler',
        header: 'Bitte bestätigen',
        message: 'Bitte bestätigen.',
        okText: 'OK',
        cancelText: 'Abbrechen'
      }
    }
    const body = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'})
    return sleep(1000).then(() => (new Response(body)))
  }

  if (entity.paths.firstname === 'yesno' && !(clientAnswers && clientAnswers['yesno'] === true)) {
    const result = {
      clientQuestion: {
        id: 'yesno',
        handler: 'YesNoQuestionHandler',
        header: 'Anmeldungen mitkopieren',
        message: 'Möchten Sie die Anmeldungen mitkopieren?',
        yesText: 'Ja',
        noText: 'Nein',
        cancelText: 'Abbrechen'
      }
    }
    const body = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'})
    return sleep(1000).then(() => (new Response(body)))
  }

  const oldEntity = entityStore.user[entity.key]

  const updatedEntity = {
    ...oldEntity,
    entity: entity.version + 1
  }

  Object.keys(entity.paths).forEach(field => {
    if (updatedEntity.paths[field].value == null) {
      updatedEntity.paths[field].value = {}
    }
    updatedEntity.paths[field].value.value = entity.paths[field]
  })

  entityStore.user[entity.key] = updatedEntity
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
