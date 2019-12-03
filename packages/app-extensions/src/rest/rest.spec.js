import fetchMock from 'fetch-mock'
import {call} from 'redux-saga/effects'

import {
  getParameterString,
  simpleRequest,
  requestSaga,
  setNullBusinessUnit,
  prepareRequest
} from './rest'
import {sendRequest} from './request'
import {handleClientQuestion} from './clientQuestions'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('getParameterString', () => {
      test('should order params', () => {
        const params = {
          param1: 'val1',
          param3: 'val3',
          param2: 'val2'
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param1=val1&param2=val2&param3=val3')
      })

      test('should remove empty params', () => {
        const params = {
          param1: '',
          param2: 'val2'
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param2=val2')
      })

      test('should decode string', () => {
        const params = {
          param1: '%'
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param1=%25')
      })

      test('should handle arrays string', () => {
        const params = {
          param1: ['1', '2']
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param1=1&param1=2')
      })

      test('should handle undefined params', () => {
        const res = getParameterString(undefined)

        expect(res).to.eql('')
      })
    })

    describe('simpleRequest', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      test('should return with accepted errorCode', () => {
        const statusCode = 400
        const bodyObj = {
          errorCode: 'SAVE_FAILED',
          errors: {
            firstname: {
              illegal: ['SPEICHERFEHLER: Vorname tocco1 nicht toleriert.']
            }
          }
        }
        const body = new Blob([JSON.stringify(bodyObj, null, 2)], {type: 'application/json'})
        const mockedResponse = new Response(body, {status: statusCode})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/2.0/Contact'
        const options = {
          acceptedErrorCodes: ['SAVE_FAILED']
        }

        return simpleRequest(resource, options).should.be.rejectedWith(mockedResponse)
      })

      test('should trow exception on unaccepted errorCode', done => {
        const statusCode = 400
        const bodyObj = {
          errorCode: 'SAVE_FAILED'
        }

        const body = new Blob([JSON.stringify(bodyObj, null, 2)], {type: 'application/json'})
        const mockedResponse = new Response(body, {status: statusCode, statusText: 'Some error'})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/2.0/Contact'
        simpleRequest(resource).catch(() => {
          done()
        })
      })

      test('should set content type header', () => {
        fetchMock.get('*', {})

        simpleRequest('', {body: {}})

        const headers = fetchMock.lastOptions().headers
        expect(headers.get('randomxyxc')).to.be.null
        expect(headers.get('content-type')).to.eql('application/json')
      })

      test('should set null business unit header', () => {
        fetchMock.get('*', {})

        simpleRequest('')
        const headers = fetchMock.lastOptions().headers
        expect(headers.get('x-business-unit')).to.be.null

        setNullBusinessUnit(true)
        simpleRequest('')
        setNullBusinessUnit(false)

        const headers2 = fetchMock.lastOptions().headers
        expect(headers2.get('x-business-unit')).to.eql('__n-u-l-l__')
      })

      test('should use ordered params', () => {
        fetchMock.get('*', {})
        const resource = 'entities/2.0/Contact'
        const options = {
          queryParams: {
            _search: 'test',
            xyz: 'abc'
          }
        }
        simpleRequest(resource, options)

        const lastCall = fetchMock.lastCall()[0]
        expect(lastCall).to.eql('/nice2/rest/entities/2.0/Contact?_search=test&xyz=abc')
      })

      test('should return with accepted status code', done => {
        const statusCode = 400

        const body = new Blob(['{}'], {type: 'application/json'})
        const mockedResponse = new Response(body, {status: statusCode})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/2.0/Contact'
        simpleRequest(resource, {
          acceptedStatusCodes: [400]
        }).then(response => {
          expect(response.status).to.eql(statusCode)
          done()
        })
      })

      test('should trow exception on unaccepted status code', done => {
        const statusCode = 400

        const body = new Blob(['{}'], {type: 'application/json'})
        const mockedResponse = new Response(body, {status: statusCode})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/2.0/Contact'
        simpleRequest(resource).catch(() => {
          done()
        })
      })
    })

    describe('requestSaga', () => {
      test(
        'should call prepareRequest, handleClientQuestions and sendRequest',
        () => {
          const resource = 'entities/2.0/Contact'
          const options = {
            queryParams: {
              _search: 'test',
              xyz: 'abc'
            },
            method: 'POST',
            body: {
              foo: 'bar'
            },
            acceptedErrorCodes: ['MY_ERROR_CODE'],
            acceptedStatusCodes: [400]
          }

          const gen = requestSaga(resource, options)

          expect(gen.next().value).to.eql(call(prepareRequest, resource, options))

          const requestData = prepareRequest(resource, options)

          expect(gen.next(requestData).value).to.eql(call(
            sendRequest,
            requestData.url,
            requestData.options,
            options.acceptedErrorCodes,
            options.acceptedStatusCodes
          ))

          const resp = {}

          expect(gen.next(resp).value).to.eql(call(
            handleClientQuestion,
            resp,
            requestData,
            options
          ))

          const next = gen.next(resp)

          expect(next.value).to.equal(resp) // expect same (not just equal)
          expect(next.done).to.be.true
        }
      )
    })

    describe('prepareRequest', () => {
      test('should append params to query', () => {
        const resource = 'entities/2.0/Contact'
        const options = {
          queryParams: {
            _search: 'test',
            xyz: 'abc'
          }
        }
        const requestData = prepareRequest(resource, options)

        expect(requestData.url).to.eql('/nice2/rest/entities/2.0/Contact?_search=test&xyz=abc')
      })

      test('should use GET as default method', () => {
        const requestData = prepareRequest('entities/2.0/Contact')
        expect(requestData.options.method).to.eql('GET')
      })

      test('should use specified method', () => {
        const options = {
          method: 'POST'
        }
        const requestData = prepareRequest('entities/2.0/Contact', options)
        expect(requestData.options.method).to.eql('POST')
      })

      test('should include credentials', () => {
        const requestData = prepareRequest('entities/Contact')
        expect(requestData.options.credentials).to.eql('include')
      })

      test('should add serialized body to options', () => {
        const resource = 'entities/2.0/Contact'
        const options = {
          method: 'POST',
          body: {
            foo: 'bar'
          }
        }
        const requestData = prepareRequest(resource, options)

        expect(requestData.options.body).to.eql('{"foo":"bar"}')
        expect(requestData.options.headers.get('Content-Type')).to.eql('application/json')
      })

      test('should add X-Business-Unit header if null business unit', () => {
        setNullBusinessUnit(true)
        const requestData = prepareRequest('entities/2.0/Contact')
        setNullBusinessUnit(false)

        expect(requestData.options.headers.get('X-Business-Unit')).to.eql('__n-u-l-l__')
      })

      test('should use backend URL from options if set', () => {
        const resource = 'entities/2.0/Contact'
        const options = {
          backendUrl: 'https://my-backend.ch'
        }
        const requestData = prepareRequest(resource, options)

        expect(requestData.url).to.eql('https://my-backend.ch/nice2/rest/entities/2.0/Contact')
      })

      test('should use absolute url if ressource is one', () => {
        const absoluteResource = 'http://www.tocco.ch/nice2/rest/entities'
        const requestData = prepareRequest(absoluteResource)

        expect(requestData.url).to.eql('http://www.tocco.ch/nice2/rest/entities')

        const absoluteResource2 = 'https://www.tocco.ch/nice2/rest/entities'
        const requestData2 = prepareRequest(absoluteResource2)

        expect(requestData2.url).to.eql('https://www.tocco.ch/nice2/rest/entities')
      })
    })
  })
})
