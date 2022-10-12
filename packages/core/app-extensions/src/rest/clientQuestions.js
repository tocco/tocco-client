import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'

import notification from '../notification'
import ClientQuestionCancelledException from './ClientQuestionCancelledException'
import {sendRequest} from './request'

const HANDLERS = {
  ConfirmQuestionHandler: handleConfirmQuestion,
  YesNoQuestionHandler: handleYesNoQuestion
}

export function* handleClientQuestion(response, requestData, options) {
  if (requestData.options.method === 'GET' || requestData.options.method === 'HEAD') {
    return response
  }

  const answers = {}

  while (response.body && response.body.clientQuestion) {
    const answer = yield call(getAnswer, response.body.clientQuestion)

    if (answer.answer == null) {
      throw new ClientQuestionCancelledException('Client question cancelled by user')
    }

    answers[response.body.clientQuestion.id] = answer.answer

    requestData.options.body = JSON.stringify({
      clientAnswers: answers,
      payload: options.body
    })

    response = yield call(
      sendRequest,
      requestData.url,
      requestData.options,
      options.acceptedErrorCodes,
      options.acceptedStatusCodes
    )
  }

  return response
}

export function* getAnswer(question) {
  const handler = HANDLERS[question.handler]
  if (handler) {
    return yield call(handler, question)
  }
  throw new Error('No question handler found for client question', question)
}

export const wrapAnswer = answer => ({answer})

export function* handleConfirmQuestion(question) {
  const answerChannel = yield call(channel)

  const confirm = () => answerChannel.put(wrapAnswer(true))
  const cancel = () => answerChannel.put(wrapAnswer(null))

  const {header, message, okText, cancelText} = question

  yield put(notification.confirm(header, message, okText, cancelText, confirm, cancel))

  return yield take(answerChannel)
}

export function* handleYesNoQuestion(question) {
  const answerChannel = yield call(channel)

  const onYes = () => answerChannel.put(wrapAnswer(true))
  const onNo = () => answerChannel.put(wrapAnswer(false))
  const onCancel = () => answerChannel.put(wrapAnswer(null))

  const {header, message, yesText, noText, cancelText} = question

  yield put(notification.yesNoQuestion(header, message, yesText, noText, cancelText, onYes, onNo, onCancel))

  return yield take(answerChannel)
}
