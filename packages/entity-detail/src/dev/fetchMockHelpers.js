import {consoleLogger} from 'tocco-util'

export const createValidateResponse = entityStore =>
  (url, opts) => {
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

export const createEntityUpdateResponse = entityStore =>
  (url, opts) => {
    consoleLogger.log('fetchMock: create/update entity', url, opts)
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

    const oldEntity = entityStore['User'][entity.key]

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

    entityStore['User'][entity.key] = updatedEntity
    return sleep(1000).then(() => (updatedEntity))
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
