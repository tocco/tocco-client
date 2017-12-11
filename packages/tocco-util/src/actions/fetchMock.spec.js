import setupFetchMock from './fetchMock'
import {simpleRequest} from '../rest'

import fetchMock from 'fetch-mock'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('fetchMock', () => {
      it('should setup basic mocks', () => {
        const postSpy = sinon.spy()

        const fetchMockMock = {
          post: postSpy
        }

        setupFetchMock(fetchMockMock, 1)
        expect(postSpy).to.be.called
      })

      it('should setup simpleAction', done => {
        setupFetchMock(fetchMock, 1)

        const resource = 'http://localhost:8080/nice2/rest/actions/simpleAction'

        simpleRequest(resource, {method: 'post'}).then(res => {
          expect(res.body.successful).to.be.true
          done()
        })
      })

      const clientQuestionEndpoint = 'http://localhost:8080/nice2/rest/actions/simpleActionWithClientQuestion'

      it('should setup simpleActionWithClientQuestion and return a clientquestion', done => {
        setupFetchMock(fetchMock, 1)

        simpleRequest(clientQuestionEndpoint, {method: 'post', body: {}}).then(res => {
          expect(res.body.clientQuestion).not.to.be.undefined
          done()
        })
      })

      it('should setup simpleActionWithClientQuestion return true to delivered client question (true)', done => {
        setupFetchMock(fetchMock, 1)

        simpleRequest(clientQuestionEndpoint, {
          method: 'post',
          body: {clientAnswers: {myYesNoQuestion: true}}
        }).then(res => {
          expect(res.body.successful).to.be.true
          done()
        })
      })

      it('should setup simpleActionWithClientQuestion return false to delivered client question (false)', done => {
        setupFetchMock(fetchMock, 1)

        simpleRequest(clientQuestionEndpoint, {
          method: 'post',
          body: {clientAnswers: {myYesNoQuestion: false}}
        }).then(res => {
          expect(res.body.successful).to.be.false
          done()
        })
      })
    })
  })
})
