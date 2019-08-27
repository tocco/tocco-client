import _cloneDeep from 'lodash/cloneDeep'
import {consoleLogger} from 'tocco-util'
import _get from 'lodash/get'

export const userValidateResponse = (entityStore, delay = 1000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock: called validate entity', url)

      const entity = JSON.parse(opts.body)
      const firstName = _get(entity, 'paths.firstname', '')

      if (firstName === 'illegal') {
        return asyncValidationErrorResponse(entity)
      }

      if (entity.paths.firstname === 'illegal0') {
        return generalAsyncValidationErrorResponse(entity)
      }

      if (firstName === 'illegal1') {
        return {throws: new Error('mock validation error')}
      }

      return {valid: true}
    })
  }

export const userCreateResponse = (entityStore, delay = 1000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock: create user entity', url, opts)
      const body = JSON.parse(opts.body)

      const entity = body.payload ? body.payload : body

      const error = createAndUpdateValidation(body, entity)
      if (error) {
        return error
      }

      const newEntity = getNewEntity(entity, entityStore)

      entityStore.User[newEntity.key] = newEntity
      return {
        status: 201,
        headers: {Location: `http://localhost:8080/nice2/rest/entities/User/${newEntity.key}`}
      }
    })
  }

export const dummyEntityCreateResponse = (entityStore, delay = 2000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock: create dummyEntity entity', url, opts)
      const body = JSON.parse(opts.body)

      const entity = body.payload ? body.payload : body

      const error = createAndUpdateValidation(body, entity)
      if (error) {
        return error
      }

      const newEntity = getNewEntity(entity, entityStore)

      entityStore.Dummy_entity[newEntity.key] = newEntity
      return {
        status: 201,
        headers: {Location: `http://localhost:8080/nice2/rest/entities/Dummy_entity/${newEntity.key}`}
      }
    })
  }

export const userUpdateResponse = (entityStore, delay = 1000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock: update entity', url, opts)
      const body = JSON.parse(opts.body)
      const entity = body.payload ? body.payload : body
      const error = createAndUpdateValidation(body, entity)
      if (error) {
        return error
      }

      const newEntity = getNewEntity(entity, entityStore)

      entityStore.User[newEntity.key] = newEntity
      return sleep(1000).then(() => (newEntity))
    })
  }

const createAndUpdateValidation = (body, entity) => {
  const firstName = _get(entity, 'paths.firstname', '')

  if (!body.clientAnswers) {
    if (firstName === 'confirm') {
      return confirmClientQuestionResponse(entity)
    }
    if (firstName === 'yesNo') {
      return yesNoClientQuestionResponse(entity)
    }
  }

  if (firstName === 'illegal2') {
    return validationErrorResponse(entity)
  }
  if (firstName === 'illegal3') {
    return notAcceptResponse(entity)
  }

  return null
}

export const dummyEntityValidateResponse = (entityStore, delay = 1000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock: called validate entity', url)

      const entity = JSON.parse(opts.body)
      const sorting = _get(entity, 'paths.sorting', '')

      if (sorting < 0) {
        return {
          valid: false,
          errors: [{
            model: entity.model,
            paths: {
              sorting: {
                toLow: ['Sorting must be greater than 0']
              }
            }
          }]
        }
      }

      return {valid: true}
    })
  }

const asyncValidationErrorResponse = entity => ({
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
})

const generalAsyncValidationErrorResponse = entity => ({
  valid: false,
  errors: [
    {
      model: 'User_status',
      key: '3',
      paths: {
        label_de: {
          mandatory: ['Pflichtfeld ist nicht ausgefüllt.']
        }
      }
    }
  ]
})

const validationErrorResponse = entity => {
  const result = {
    errorCode: 'VALIDATION_FAILED',
    errors: [
      {
        model: entity.model,
        key: entity.key,
        paths: {
          firstname: {
            firstname: ['SUBMIT ERROR: Firstname should not be "illegal2".']
          }
        },
        entityValidatorErrors: {
          UsernameAsciiValidator: [
            'Submit entity Validator error. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          ]
        }
      }, {
        model: 'Related_entity',
        key: '3',
        paths: {
          username: {
            username: ['Related entity path error']
          }
        },
        entityValidatorErrors: {
          SomeId: [
            'Related entity Submit entity Validator error. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          ]
        }
      }
    ]
  }
  const body = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'})
  return new Response(body, {status: 400})
}

const notAcceptResponse = () => {
  const result = {
    errorCode: 'NOT_ACCEPTED',
    errors: []
  }
  const body = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'})
  return new Response(body, {status: 400})
}

const confirmClientQuestionResponse = entity => ({
  clientQuestion: {
    id: 'myConfirmQuestion',
    handler: 'ConfirmQuestionHandler',
    header: 'Please Confirm',
    message:
      'This is a client confirm question<br/>are you sure you want to save this?<br/>really?',
    okText:
      'Yes, Really',
    cancelText:
      'No sorry, Cancel'
  }
})

const yesNoClientQuestionResponse = entity => ({
  clientQuestion: {
    id: 'myYesNoQuestion',
    handler: 'YesNoQuestionHandler',
    header: 'Please choose',
    message: 'Should we do other stuff as well?<br/>Choose wisely',
    yesText: 'Just do it!',
    noText: 'no no',
    cancelText: 'Cancel'
  }
})

const getNewEntity = (entity, entityStore) => {
  let newEntity

  if (entity.key === null) {
    const template = getTemplate(entity.model, entityStore)
    newEntity = template
    newEntity.version = 1
    newEntity.key = entityStore[entity.model].length
  } else {
    newEntity = entityStore[entity.model][entity.key]
    newEntity.version += 1
  }

  Object.keys(newEntity.paths).forEach(path => {
    if (entity.paths[path]) {
      if (newEntity.paths[path].type === 'field') {
        newEntity.paths[path].value.value = entity.paths[path]
      } else {
        newEntity.paths[path].value = entity.paths[path]
      }
    }
  })

  return newEntity
}

const getTemplate = (entityName, entityStore) => {
  const template = _cloneDeep(entityStore[entityName][2])

  Object.keys(template.paths).forEach(field => {
    const templateField = template.paths[field]
    if (templateField.type === 'entity-list') {
      templateField.value = []
    } else if (templateField.type === 'entity') {
      templateField.value = {}
    } else {
      if (templateField) {
        if (typeof templateField.value === 'object') {
          templateField.value.value = ''
        } else {
          templateField.value = null
        }
      }
    }
  })

  return template
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
