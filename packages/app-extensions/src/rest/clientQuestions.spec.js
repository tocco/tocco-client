import {channel} from 'redux-saga'
import {call, take} from 'redux-saga/effects'

import {
  handleClientQuestion,
  getAnswer,
  handleConfirmQuestion,
  handleYesNoQuestion,
  answer
} from './clientQuestions'
import {sendRequest} from './request'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('clientQuestions', () => {
      describe('handleClientQuestion', () => {
        test('should return GET and HEAD responses directly', () => {
          const testFn = method => {
            const response = {
              body: {
                foo: 'bar'
              }
            }

            const requestData = {
              options: {
                method
              }
            }
            const options = {}

            const gen = handleClientQuestion(response, requestData, options)

            const next = gen.next()

            expect(next.value).to.equal(response)
            expect(next.done).to.be.true
          }

          testFn('GET')
          testFn('HEAD')
        })

        test('should return response if no client question', () => {
          const response = {
            body: {
              foo: 'bar'
            }
          }

          const requestData = {
            options: {
              method: 'POST'
            }
          }
          const options = {}

          const gen = handleClientQuestion(response, requestData, options)

          const next = gen.next()

          expect(next.value).to.equal(response)
          expect(next.done).to.be.true
        })

        test('should get answer from user', () => {
          const questionResponse = {
            body: {
              clientQuestion: {
                id: 'testquestion'
              }
            }
          }
          const requestData = {
            url: '/foo/bar',
            options: {
              method: 'POST'
            }
          }
          const options = {
            body: {
              foo: 'bar'
            },
            acceptedErrorCodes: [],
            acceptedStatusCodes: []
          }

          const gen = handleClientQuestion(questionResponse, requestData, options)

          expect(gen.next().value).to.eql(call(getAnswer, questionResponse.body.clientQuestion))

          const answer = {
            answer: true
          }

          const newBody = JSON.stringify({
            clientAnswers: {
              testquestion: true
            },
            payload: options.body
          })
          const newOptions = {
            method: 'POST',
            body: newBody
          }

          expect(gen.next(answer).value).to.eql(call(
            sendRequest,
            requestData.url,
            newOptions,
            options.acceptedErrorCodes,
            options.acceptedStatusCodes
          ))

          const response = {
            responseField: 'foo'
          }

          const next = gen.next(response)

          expect(next.value).to.equal(response)
          expect(next.done).to.be.true
        })
      })

      describe('getAnswer', () => {
        test('should call ConfirmQuestionHandler', () => {
          const question = {
            id: 'testquestion',
            handler: 'ConfirmQuestionHandler'
          }

          const gen = getAnswer(question)

          expect(gen.next().value).to.eql(call(handleConfirmQuestion, question))

          const ans = answer(true)

          const next = gen.next(ans)

          expect(next.value).to.equal(ans)
          expect(next.done).to.be.true
        })

        test('should call YesNoQuestionHandler', () => {
          const question = {
            id: 'testquestion',
            handler: 'YesNoQuestionHandler'
          }

          const gen = getAnswer(question)

          expect(gen.next().value).to.eql(call(handleYesNoQuestion, question))

          const ans = answer(true)

          const next = gen.next(ans)

          expect(next.value).to.equal(ans)
          expect(next.done).to.be.true
        })
      })

      describe('handleConfirmQuestion', () => {
        test('should get answer from user with confirmation dialog', () => {
          const question = {
            id: 'testquestion',
            handler: 'ConfirmQuestionHandler',
            message: 'msg',
            okText: 'ok',
            cancelText: 'cancel'
          }

          const gen = handleConfirmQuestion(question)

          expect(gen.next().value).to.eql(call(channel))

          const mockedChannel = channel()

          const confirmActionPut = gen.next(mockedChannel).value

          const actionPayload = confirmActionPut.PUT.action.payload

          expect(actionPayload.message).to.eql(question.message)
          expect(actionPayload.okText).to.eql(question.okText)
          expect(actionPayload.cancelText).to.eql(question.cancelText)

          expect(gen.next().value).to.eql(take(mockedChannel))

          const ans = answer(true)

          const next = gen.next(ans)

          expect(next.value).to.equal(ans)
          expect(next.done).to.be.true
        })
      })

      describe('handleYesNoQuestion', () => {
        test('should get answer from user with yes/no dialog', () => {
          const question = {
            id: 'testquestion',
            handler: 'YesNoQuestionHandler',
            header: 'title',
            message: 'msg',
            yesText: 'yes',
            noText: 'no',
            cancelText: 'cancel'
          }

          const gen = handleYesNoQuestion(question)

          expect(gen.next().value).to.eql(call(channel))

          const mockedChannel = channel()

          const confirmActionPut = gen.next(mockedChannel).value

          const actionPayload = confirmActionPut.PUT.action.payload

          expect(actionPayload.message).to.eql(question.message)
          expect(actionPayload.title).to.eql(question.header)
          expect(actionPayload.yesText).to.eql(question.yesText)
          expect(actionPayload.noText).to.eql(question.noText)
          expect(actionPayload.cancelText).to.eql(question.cancelText)

          expect(gen.next().value).to.eql(take(mockedChannel))

          const ans = answer(true)

          const next = gen.next(ans)

          expect(next.value).to.equal(ans)
          expect(next.done).to.be.true
        })
      })
    })
  })
})
