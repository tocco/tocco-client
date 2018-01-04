import {setupActions} from './actions'
import {simpleRequest} from '../rest'

import fetchMock from 'fetch-mock'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('actions', () => {
      it('should setup basic action mocks', () => {
        const postSpy = sinon.spy()

        const fetchMockMock = {
          post: postSpy
        }

        setupActions(fetchMockMock, null, 1)
        expect(postSpy).to.be.called
      })

      it('should setup simpleAction', done => {
        setupActions(fetchMock, null, 1)

        const resource = 'http://localhost:8080/nice2/rest/actions/simpleAction'

        simpleRequest(resource, {method: 'post'}).then(res => {
          expect(res.body.successful).to.be.true
          done()
        })
      })

      const clientQuestionEndpoint = 'http://localhost:8080/nice2/rest/actions/yesNoClientQuestion'

      it('should setup simpleActionWithClientQuestion and return a clientquestion', done => {
        setupActions(fetchMock, null, 1)

        simpleRequest(clientQuestionEndpoint, {method: 'post', body: {}}).then(res => {
          expect(res.body.clientQuestion).not.to.be.undefined
          done()
        })
      })

      it('should setup simpleActionWithClientQuestion return true to delivered client question (true)', done => {
        setupActions(fetchMock, null, 1)

        simpleRequest(clientQuestionEndpoint, {
          method: 'post',
          body: {clientAnswers: {myYesNoQuestion: true}}
        }).then(res => {
          expect(res.body.successful).to.be.true
          done()
        })
      })

      it('should setup simpleActionWithClientQuestion return false to delivered client question (false)', done => {
        setupActions(fetchMock, null, 1)

        simpleRequest(clientQuestionEndpoint, {
          method: 'post',
          body: {clientAnswers: {myYesNoQuestion: false}}
        }).then(res => {
          expect(res.body.successful).to.be.false
          done()
        })
      })

      const formQuestionEndpoint = 'http://localhost:8080/nice2/rest/actions/formClientQuestion'

      it('should return a form client question', done => {
        setupActions(fetchMock, null, 1)

        simpleRequest(formQuestionEndpoint, {
          method: 'post',
          body: {}
        }).then(res => {
          expect(res.body.clientQuestion.form).not.to.be.undefined
          done()
        })
      })
    })
  })
})
