import fetchMock from 'fetch-mock'

import {setupActions} from './actions'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('actions', () => {
      test('should setup basic action mocks', () => {
        const postSpy = sinon.spy()

        const fetchMockMock = {
          post: postSpy
        }

        setupActions(fetchMockMock, null, 1)
        expect(postSpy).to.be.called
      })

      test('should setup simpleAction', done => {
        setupActions(fetchMock, null, 1)

        const resource = '/nice2/rest/actions/simpleAction'

        fetch(resource, {method: 'POST'}).then(res => res.json()).then(res => {
          expect(res.success).to.be.true
          done()
        })
      })

      const clientQuestionEndpoint = '/nice2/rest/actions/yesNoClientQuestion'

      test(
        'should setup simpleActionWithClientQuestion and return a clientquestion',
        done => {
          setupActions(fetchMock, null, 1)

          fetch(clientQuestionEndpoint, {method: 'POST', body: '{}'}).then(res => res.json()).then(res => {
            expect(res.clientQuestion).not.to.be.undefined
            done()
          })
        }
      )

      test(
        'should setup simpleActionWithClientQuestion return true to delivered client question (true)',
        done => {
          setupActions(fetchMock, null, 1)

          fetch(clientQuestionEndpoint, {
            method: 'post',
            body: '{"clientAnswers": {"myYesNoQuestion": true}}'
          })
            .then(res => res.json())
            .then(res => {
              expect(res.success).to.be.true
              done()
            })
        }
      )

      test(
        'should setup simpleActionWithClientQuestion return false to delivered client question (false)',
        done => {
          setupActions(fetchMock, null, 1)

          fetch(clientQuestionEndpoint, {
            method: 'post',
            body: '{"clientAnswers": {"myYesNoQuestion": false}}'
          })
            .then(res => res.json())
            .then(res => {
              expect(res.success).to.be.false
              done()
            })
        }
      )

      const formQuestionEndpoint = '/nice2/rest/actions/formClientQuestion'

      test('should return a form client question', done => {
        setupActions(fetchMock, null, 1)

        fetch(formQuestionEndpoint, {
          method: 'POST',
          body: '{}'
        })
          .then(res => res.json())
          .then(res => {
            expect(res.clientQuestion.form).not.to.be.undefined
            done()
          })
      })

      const validationErrorUrl = '/nice2/rest/actions/validationError'

      test('should setup a action endpoint that throws a validation error', done => {
        setupActions(fetchMock, null, 1)
        fetch(validationErrorUrl, {
          method: 'POST',
          acceptedErrorCodes: 'VALIDATION_FAILED'
        }).then(res => {
          done()
        })
      })
    })
  })
})
