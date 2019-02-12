import _map from 'lodash/map'

import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'

export const setupActions = (fetchMock, entityStore, timeout = 2000) => {
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/yesNoClientQuestion*?'),
    yesNoClientQuestion(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/formClientQuestion*?'),
    formClientQuestion(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleAction*?'),
    simpleAction(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/validationError*?'),
    validationError(timeout)
  )
}

const simpleAction = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)

      return {
        status: 200,
        body: {
          success: true,
          message: 'Action completed!'
        }
      }
    })
  }

const validationError = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call validationError action', url, opts)
      return {
        status: 400,
        body: {
          message: 'Validation failed',
          errorCode: 'VALIDATION_FAILED',
          errors: [
            {
              model: 'Principal',
              key: null,
              paths: {
                username: {
                  username: [
                    'Der Wert ist bereits vergeben und dadurch nicht eindeutig'
                  ]
                }
              },
              entityValidatorErrors: {
                UsernameAsciiValidator: [
                  'Nur Buchstaben, Zahlen und die meisten Sonderzeichen sind erlaubt.'
                ]
              }
            }
          ]
        }
      }
    })
  }

const yesNoClientQuestion = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)
      const body = JSON.parse(opts.body)
      if (!body.clientAnswers) {
        return yesNoClientQuestionResponse
      } else {
        if (!body.clientAnswers.myYesNoQuestion) {
          return {
            success: false,
            message: 'Action failed, this is on you!'
          }
        } else {
          return {success: true}
        }
      }
    })
  }

const formClientQuestion = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)
      const body = JSON.parse(opts.body)
      if (!body.clientAnswers) {
        return formClientQuestionResponse
      } else {
        return {
          success: true,
          message: _map(body.clientAnswers.myFormQuestion, v => v).join(', ')
        }
      }
    })
  }

const yesNoClientQuestionResponse = {
  clientQuestion: {
    id: 'myYesNoQuestion',
    handler: 'YesNoQuestionHandler',
    header: 'Fail?',
    message: 'Should this action fail?<br/>Choose wisely',
    yesText: 'NO!',
    noText: 'Yes, let it fail',
    cancelText: 'Cancel'
  }
}

const formClientQuestionResponse = {
  clientQuestion: {
    id: 'myFormQuestion',
    handler: 'FormQuestionHandler',
    header: 'Some questions',
    message: 'Please fill out the form',
    sendText: 'ok',
    cancelText: 'cancel',
    form: require('./data/my_session_only_detail_form'),
    model: require('./data/my_session_only_model')
  }
}
