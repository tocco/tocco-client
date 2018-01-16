import React from 'react'
import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import notifier from '../notifier'
import {sendRequest} from './request'
import ClientQuestionCancelledException from './ClientQuestionCancelledException'
import SimpleFormApp from 'tocco-simple-form/src/main'

const HANDLERS = {
  ConfirmQuestionHandler: handleConfirmQuestion,
  YesNoQuestionHandler: handleYesNoQuestion,
  FormQuestionHandler: handleFormQuestion
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

export const answer = answer => ({answer})

export function* handleConfirmQuestion(question) {
  const answerChannel = yield call(channel)

  const confirm = () => answerChannel.put(answer(true))
  const cancel = () => answerChannel.put(answer(null))

  const {header, message, okText, cancelText} = question

  yield put(notifier.confirm(header, message, okText, cancelText, confirm, cancel))

  return yield take(answerChannel)
}

export function* handleYesNoQuestion(question) {
  const answerChannel = yield call(channel)

  const onYes = () => answerChannel.put(answer(true))
  const onNo = () => answerChannel.put(answer(false))
  const onCancel = () => answerChannel.put(answer(null))

  const {header, message, yesText, noText, cancelText} = question

  yield put(notifier.yesNoQuestion(header, message, yesText, noText, cancelText, onYes, onNo, onCancel))

  return yield take(answerChannel)
}

export function* handleFormQuestion(question) {
  const answerChannel = yield call(channel)

  const onSend = values => answerChannel.put(answer(values))
  const onCancel = () => answerChannel.put(answer(null))

  const {id, header, message, model, form, sendText, cancelText} = question

  yield put(notifier.modalComponent(id, header, message, () => (
    <SimpleFormApp
      onSubmit={onSend}
      onCancel={onCancel}
      model={model}
      form={form}
      submitText={sendText}
      cancelText={cancelText}
    />)))
  const returnedAnswer = yield take(answerChannel)
  yield put(notifier.removeModalComponent(id))
  return returnedAnswer
}
