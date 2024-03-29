import fetchMock from 'fetch-mock'

import InformationError from './InformationError'
import {sendByteRequest, sendRequest} from './request'

describe('app-extensions', () => {
  describe('rest', () => {
    beforeEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    describe('request', () => {
      test('should call fetch and return response with body', async () => {
        const body = {
          successful: true
        }
        fetchMock.put(new RegExp('.*'), body)

        const url = '/entities/User/1'
        const options = {method: 'PUT'}
        const acceptedErrorCodes = []
        const acceptedStatusCodes = []

        const result = await sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes)

        expect(result.ok).to.be.true
        expect(result.status).to.eql(200)
        expect(result.body).to.eql(body)
      })

      test('should throw error if non accepted response is received ', async () => {
        fetchMock.post(new RegExp('.*'), new Response(JSON.stringify({}), {status: 400}))

        const url = '/entities/User/1'
        const options = {method: 'POST'}
        const acceptedErrorCodes = []
        const acceptedStatusCodes = []

        try {
          await sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes)
        } catch (e) {
          expect(e.message).to.contain('Bad Request')
        }
      })

      test('should NOT throw error if accepted status code is received ', async () => {
        const body = {test: 123}
        fetchMock.post(new RegExp('.*'), new Response(JSON.stringify(body), {status: 400}))

        const url = '/entities/User/1'
        const options = {method: 'POST'}
        const acceptedErrorCodes = []
        const acceptedStatusCodes = [400]

        const result = await sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes)
        expect(result.status).to.eql(400)
        expect(result.body).to.eql(body)
      })

      test('should NOT throw error if accepted error code is received ', async () => {
        const body = {errorCode: 44}
        fetchMock.post(new RegExp('.*'), new Response(JSON.stringify(body), {status: 300}))

        const url = '/entities/User/1'
        const options = {method: 'POST'}
        const acceptedErrorCodes = [44]
        const acceptedStatusCodes = []

        const result = await sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes)
        expect(result.status).to.eql(300)
        expect(result.body).to.eql(body)
      })

      test('should return body null for status 204 ', async () => {
        fetchMock.post(new RegExp('.*'), 204)

        const url = '/entities/User/1'
        const options = {method: 'POST'}

        const result = await sendRequest(url, options)
        expect(result.status).to.eql(204)
        expect(result.body).to.be.null
      })

      test('should throw information error for status 409 ', async () => {
        fetchMock.post(new RegExp('.*'), new Response(JSON.stringify({information: 'message'}), {status: 409}))

        const url = '/entities/User/1'
        const options = {method: 'POST'}

        try {
          await sendRequest(url, options)
        } catch (e) {
          expect(e).to.be.instanceof(InformationError)
          expect(e.message).to.eql('message')
        }
      })
    })

    describe('sendByteRequest', () => {
      test('should call fetch and return response with blob', async () => {
        fetchMock.post(new RegExp('.*'), 'some data')

        const url = '/bytes'
        const options = {method: 'POST'}
        const acceptedErrorCodes = []
        const acceptedStatusCodes = []

        const result = await sendByteRequest(url, options, acceptedErrorCodes, acceptedStatusCodes)

        expect(result.ok).to.be.true
        expect(result.status).to.eql(200)
        const blobData = await result.body.text()
        expect(blobData).to.eql('some data')
      })
    })
  })
})
