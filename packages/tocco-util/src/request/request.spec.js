import fetchMock from 'fetch-mock'

import env from '../env'
import originId from '../originId'
import {executeRequest, extractBody, prepareHeaders, prepareOptions, prepareUrl} from './request'

describe('tocco-util', () => {
  describe('request', () => {
    describe('prepareUrl', () => {
      test('should handle prefixed slash', () => {
        const backendUrl = 'https://tocco.ch'
        const resource = '/nice2/test'

        expect(prepareUrl(backendUrl, resource)).to.equal('https://tocco.ch/nice2/test')
      })
      
      test('should handle non prefixed slash', () => {
        const backendUrl = 'https://tocco.ch'
        const resource = 'nice2/test'

        expect(prepareUrl(backendUrl, resource)).to.equal('https://tocco.ch/nice2/test')
      })

      test('should handle absolute resource', () => {
        const backendUrl = 'https://tocco.ch'
        const resource = 'https://master.tocco.ch/nice2/test'

        expect(prepareUrl(backendUrl, resource)).to.equal('https://master.tocco.ch/nice2/test')
      })

      test('should add missing nice2', () => {
        const backendUrl = 'https://tocco.ch'
        const resource = 'test'

        expect(prepareUrl(backendUrl, resource)).to.equal('https://tocco.ch/nice2/test')
      })
    })

    describe('prepareHeaders', () => {
      afterEach(() => {
        env.setBusinessUnit(undefined)
      })

      test('should handle empty headers', () => {
        const options = {}

        const headers = prepareHeaders(options)

        expect(headers.get('Content-Type')).to.deep.equal('application/json')
        expect(headers.get('X-Origin-Id')).to.deep.equal(originId.getOriginId())
        expect(Array.from(headers).length).to.equal(2)
      })

      test('should handle text body', () => {
        const options = {
          body: 'foo'
        }

        const headers = prepareHeaders(options)

        expect(headers.get('Content-Type')).to.deep.equal('text/plain')
        expect(Array.from(headers).length).to.equal(2)
      })

      test('should ignore FormData body', () => {
        const options = {
          body: new FormData()
        }

        const headers = prepareHeaders(options)

        expect(headers.get('X-Origin-Id')).to.deep.equal(originId.getOriginId())
        expect(Array.from(headers).length).to.equal(1)
      })

      test('should add business unit header', () => {
        env.setBusinessUnit('test')
        const options = {}

        const headers = prepareHeaders(options)

        expect(headers.get('X-Business-Unit')).to.deep.equal('test')
        expect(Array.from(headers).length).to.equal(3)
      })

      test('should be able to set content-type', () => {
        const options = {
          headers: new Headers({
            'Content-Type': 'anything'
          })
        }

        const headers = prepareHeaders(options)

        expect(headers.get('Content-Type')).to.deep.equal('anything')
        expect(Array.from(headers).length).to.equal(2)
      })

      test('should be able to set x-business-unit', () => {
        env.setBusinessUnit('test')
        const options = {
          headers: new Headers({
            'X-Business-Unit': 'anything'
          })
        }

        const headers = prepareHeaders(options)

        expect(headers.get('X-Business-Unit')).to.deep.equal('anything')
        expect(Array.from(headers).length).to.equal(3)
      })

      test('should be able to set x-origin-id', () => {
        const options = {
          headers: new Headers({
            'X-Origin-Id': 'anything'
          })
        }

        const headers = prepareHeaders(options)

        expect(headers.get('X-Origin-Id')).to.deep.equal('anything')
        expect(Array.from(headers).length).to.equal(2)
      })
    })

    describe('prepareOptions', () => {
      test('should add default options', () => {
        const options = {}

        const expectedOptions = {
          method: 'GET',
          credentials: 'include',
          headers: new Headers()
        }
        
        const preparedOptions = prepareOptions(options)
        expect(preparedOptions).to.deep.equal(expectedOptions)
        expect(preparedOptions.headers.get('Content-Type')).to.deep.equal('application/json')
        expect(preparedOptions.headers.get('X-Origin-Id')).to.deep.equal(originId.getOriginId())
      })

      test('should be able to overwrite default options', () => {
        const options = {
          method: 'POST',
          credentials: 'same-origin'
        }

        const expectedOptions = {
          method: 'POST',
          credentials: 'same-origin',
          headers: new Headers()
        }
        
        const preparedOptions = prepareOptions(options)
        expect(preparedOptions).to.deep.equal(expectedOptions)
      })
    })

    describe('executeRequest', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
        env.setBackendUrl(undefined)
      })
    
      test('should execute fetch', () => {
        const resource = 'username'
        const options = {}

        fetchMock.get('/nice2/username', new Response({}, {status: 200}))
        const promise = executeRequest(resource, options)
        return promise
      })

      test('should consider dynamic backend url', () => {
        env.setBackendUrl('https://tocco.ch')
        const resource = 'username'
        const options = {}

        fetchMock.get('https://tocco.ch/nice2/username', new Response({}, {status: 200}))
        const promise = executeRequest(resource, options)
        return promise
      })

      test('should be able to execute POST request', () => {
        env.setBackendUrl('https://tocco.ch')
        const resource = 'username'
        const options = {method: 'POST'}

        fetchMock.post('https://tocco.ch/nice2/username', new Response({}, {status: 200}))
        const promise = executeRequest(resource, options)
        return promise
      })
    })

    describe('extractBody', () => {
      test('should return json', async() => {
        const response = new Response(JSON.stringify({a: 'foo'}))
        const body = await extractBody(response)
        
        expect(body).to.deep.equal({a: 'foo'})
        return body
      })
    })
  })
})
