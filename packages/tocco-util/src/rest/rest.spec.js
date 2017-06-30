import {call} from 'redux-saga/effects'
import {
  getParameterString,
  request,
  getRequestSaga,
  requestSaga,
  setNullBusinessUnit,
  prepareRequest
} from './rest'
import {sendRequest} from './request'
import {handleClientQuestion} from './clientQuestions'
import fetchMock from 'fetch-mock'

describe('tocco-util', () => {
  describe('rest', () => {
    describe('getParameterString', () => {
      it('should order params', () => {
        const params = {
          'param1': 'val1',
          'param3': 'val3',
          'param2': 'val2'
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param1=val1&param2=val2&param3=val3')
      })

      it('should remove empty params', () => {
        const params = {
          'param1': '',
          'param2': 'val2'
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param2=val2')
      })

      it('should decode string', () => {
        const params = {
          'param1': '%'
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param1=%25')
      })

      it('should handle arrays string', () => {
        const params = {
          'param1': ['1', '2']
        }
        const res = getParameterString(params)

        expect(res).to.eql('?param1=1&param1=2')
      })

      it('should handle undefined params', () => {
        const res = getParameterString(undefined)

        expect(res).to.eql('')
      })
    })

    describe('request', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('should return with accepted errorCode', done => {
        const statusCode = 400
        const bodyObj = {
          errorCode: 'SAVE_FAILED',
          errors: {
            'firstname': {
              'illegal': ['SPEICHERFEHLER: Vorname tocco1 nicht toleriert.']
            }
          }
        }
        const body = new Blob([JSON.stringify(bodyObj, null, 2)], {type: 'application/json'})
        const mockedResponse = new Response(body, {'status': statusCode})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/Contact'
        request(resource, {}, 'GET', {}, ['SAVE_FAILED']).then(response => {
          expect(response.status).to.eql(statusCode)
          expect(response.body).to.eql(bodyObj)
          done()
        })
      })

      it('should trow exception on unaccepted errorCode', done => {
        const statusCode = 400
        const bodyObj = {
          errorCode: 'SAVE_FAILED'
        }

        const body = new Blob([JSON.stringify(bodyObj, null, 2)], {type: 'application/json'})
        const mockedResponse = new Response(body, {'status': statusCode, statusText: 'Some error'})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/Contact'
        request(resource, {}, 'GET', {}, []).catch(() => {
          done()
        })
      })

      it('should set content type header', () => {
        fetchMock.get('*', {})

        request('', {}, 'GET', {}, [])

        const headers = fetchMock.lastOptions().headers
        expect(headers.get('randomxyxc')).to.be.null
        expect(headers.get('content-type')).to.eql('application/json')
      })

      it('should set null business unit header', () => {
        fetchMock.get('*', {})

        request('', {}, 'GET', {}, [])
        const headers = fetchMock.lastOptions().headers
        expect(headers.get('x-business-unit')).to.be.null

        setNullBusinessUnit(true)
        request('', {}, 'GET', {}, [])
        setNullBusinessUnit(false)

        const headers2 = fetchMock.lastOptions().headers
        expect(headers2.get('x-business-unit')).to.eql('__n-u-l-l__')
      })

      it('should use ordered params', () => {
        fetchMock.get('*', {})
        const resource = 'entities/Contact'
        const params = {
          _search: 'test',
          xyz: 'abc'
        }
        request(resource, params)

        const lastCall = fetchMock.lastCall()[0]
        expect(lastCall).to.eql('/nice2/rest/entities/Contact?_search=test&xyz=abc')
      })

      it('should return with accepted status code', done => {
        const statusCode = 400

        const body = new Blob(['{}'], {type: 'application/json'})
        const mockedResponse = new Response(body, {'status': statusCode})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/Contact'
        request(resource, undefined, undefined, undefined, undefined, [400]).then(response => {
          expect(response.status).to.eql(statusCode)
          expect(response.body).to.eql({})
          done()
        })
      })

      it('should trow exception on unaccepted status code', done => {
        const statusCode = 400

        const body = new Blob(['{}'], {type: 'application/json'})
        const mockedResponse = new Response(body, {'status': statusCode})

        fetchMock.get('*', mockedResponse)
        const resource = 'entities/Contact'
        request(resource, undefined, undefined, undefined, undefined, []).catch(() => {
          done()
        })
      })
    })

    describe('getRequestSaga', () => {
      it('should call request saga', () => {
        const resource = 'entities/Contact'
        const queryParams = {
          _search: 'test',
          xyz: 'abc'
        }
        const acceptedErrorCodes = ['MY_ERROR_CODE']

        const gen = getRequestSaga(resource, queryParams, acceptedErrorCodes)

        const expectedOptions = {
          method: 'GET',
          queryParams,
          acceptedErrorCodes
        }
        expect(gen.next().value).to.eql(call(requestSaga, resource, expectedOptions))

        const resp = {}

        const next = gen.next(resp)

        expect(next.value).to.equal(resp) // expect same (not just equal)
        expect(next.done).to.be.true
      })
    })

    describe('requestSaga', () => {
      it('should call prepareRequest, handleClientQuestions and sendRequest', () => {
        const resource = 'entities/Contact'
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
      })
    })

    describe('prepareRequest', () => {
      it('should append params to query', () => {
        const resource = 'entities/Contact'
        const options = {
          queryParams: {
            _search: 'test',
            xyz: 'abc'
          }
        }
        const requestData = prepareRequest(resource, options)

        expect(requestData.url).to.eql('/nice2/rest/entities/Contact?_search=test&xyz=abc')
      })

      it('should use GET as default method', () => {
        const requestData = prepareRequest('entities/Contact')
        expect(requestData.options.method).to.eql('GET')
      })

      it('should use specified method', () => {
        const options = {
          method: 'POST'
        }
        const requestData = prepareRequest('entities/Contact', options)
        expect(requestData.options.method).to.eql('POST')
      })

      it('should include credentials', () => {
        const requestData = prepareRequest('entities/Contact')
        expect(requestData.options.credentials).to.eql('include')
      })

      it('should add serialized body to options', () => {
        const resource = 'entities/Contact'
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

      it('should add X-Business-Unit header if null business unit', () => {
        setNullBusinessUnit(true)
        const requestData = prepareRequest('entities/Contact')
        setNullBusinessUnit(false)

        expect(requestData.options.headers.get('X-Business-Unit')).to.eql('__n-u-l-l__')
      })

      it('should use backend URL from options if set', () => {
        const resource = 'entities/Contact'
        const options = {
          backendUrl: 'https://my-backend.ch'
        }
        const requestData = prepareRequest(resource, options)

        expect(requestData.url).to.eql('https://my-backend.ch/nice2/rest/entities/Contact')
      })
    })
  })
})
