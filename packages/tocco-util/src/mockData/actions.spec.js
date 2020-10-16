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
