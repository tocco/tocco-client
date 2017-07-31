import {consoleLogger} from 'tocco-util'
import _get from 'lodash/get'

export const createValidateResponse = (entityStore, delay = 1000) =>
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

export const createEntityUpdateResponse = (entityStore, delay = 1000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock: create/update entity', url, opts)
      const body = JSON.parse(opts.body)

      const entity = body.payload ? body.payload : body

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
  return new Response(body, {'status': 400})
}

const notAcceptResponse = () => {
  const result = {
    errorCode: 'NOT_ACCEPTED',
    errors: []
  }
  const body = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'})
  return new Response(body, {'status': 400})
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
