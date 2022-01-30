import fetchMock from 'fetch-mock'
import {call, select} from 'redux-saga/effects'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {intl} from 'tocco-util'

import {
  getParameterString,
  simpleRequest,
  requestSaga,
  setBusinessUnit,
  prepareRequest,
  setLocale
} from './rest'
import {sendRequest} from './request'
import {handleClientQuestion} from './clientQuestions'
import {INFO} from '../notifier/modules/actions'
import InformationError from './InformationError'

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

      test('should set content type header if body is FormData (browser will set content type)', () => {
        fetchMock.get('*', {})

        simpleRequest('', {body: new FormData()})

        const headers = fetchMock.lastOptions().headers
        expect(headers.get('content-type')).to.be.null
      })

      test('should set business unit header', () => {
        fetchMock.get('*', {})

        simpleRequest('')
        const headers = fetchMock.lastOptions().headers
        expect(headers.get('x-business-unit')).to.be.null

        setBusinessUnit('my_test_bu')
        simpleRequest('')
        setBusinessUnit(null)

        const headers2 = fetchMock.lastOptions().headers
        expect(headers2.get('x-business-unit')).to.eql('my_test_bu')
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

          expect(gen.next().value).to.eql(call(setLocale, options))

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

      test('should notify about unexpected information errors', () => {
        const resource = 'entities/2.0/Contact'
        const options = {
          method: 'POST',
          body: {
            foo: 'bar'
          }
        }

        const error = new InformationError('message')
        return expectSaga(requestSaga, resource, options)
          .provide([
            [select(intl.localeSelector), 'fr'],
            [matchers.call.fn(prepareRequest), {}],
            [matchers.call.fn(sendRequest), throwError(error)]
          ])
          .put.like({
            action: {
              type: INFO,
              payload: {
                type: 'info',
                title: 'client.common.information',
                message: 'message',
                icon: null,
                timeOut: 5000
              }
            }
          })
          .run()
      })
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

      test('should add X-Business-Unit header if business unit set', () => {
        setBusinessUnit('my_test_bu')
        const requestData = prepareRequest('entities/2.0/Contact')
        setBusinessUnit(null)

        expect(requestData.options.headers.get('X-Business-Unit')).to.eql('my_test_bu')
      })

      test('should add X-Origin-Id header', () => {
        const requestData = prepareRequest('entities/Contact')
        expect(requestData.options.headers.get('X-Origin-Id')).to.be.not.undefined
        expect(requestData.options.headers.get('X-Origin-Id')).to.be.not.null
      })

      test('should add same X-Origin-Id for session', () => {
        const requestData = prepareRequest('entities/Contact')
        const originId = requestData.options.headers.get('X-Origin-Id')

        const requestData2 = prepareRequest('entities/User')
        const originId2 = requestData2.options.headers.get('X-Origin-Id')
        expect(originId).to.eql(originId2)
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

      test('should use nice2 url if resource is one', () => {
        const absoluteResource = 'nice2/login'
        const requestData = prepareRequest(absoluteResource, {backendUrl: 'backend'})

        expect(requestData.url).to.eql('backend/nice2/login')
      })

      test('should use Content-Type passed in options', () => {
        const resource = 'endpoint'
        const options = {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          }),
          body: 'foo=bar'
        }

        const requestData = prepareRequest(resource, options)
        const contentTypeHeader = requestData.options.headers.get('Content-Type')
        expect(contentTypeHeader).to.eql('application/x-www-form-urlencoded; charset=utf-8')
      })

      test('should use passed Headers object', () => {
        const resource = 'endpoint'
        const optionHeaders = new Headers({
          'Content-Type': 'application/json'
        })
        const options = {
          headers: optionHeaders,
          body: {some: 'thing'}
        }

        const requestData = prepareRequest(resource, options)
        const headers = requestData.options.headers
        expect(headers).to.eql(optionHeaders)
        const contentTypeHeader = headers.get('Content-Type')
        expect(contentTypeHeader).to.eql('application/json')
      })

      test('should create Headers from passed object', () => {
        const resource = 'endpoint'
        const options = {
          headers: {
            'Content-Type': 'application/json'
          },
          body: {some: 'thing'}
        }

        const requestData = prepareRequest(resource, options)
        const headers = requestData.options.headers
        expect(headers).to.be.an.instanceOf(Headers)
        const contentTypeHeader = headers.get('Content-Type')
        expect(contentTypeHeader).to.eql('application/json')
      })

      test('should create empty Headers when nothing passed', () => {
        const resource = 'endpoint'
        const options = {
          body: {some: 'thing'}
        }

        const requestData = prepareRequest(resource, options)
        const headers = requestData.options.headers
        expect(headers).to.be.an.instanceOf(Headers)
        const contentTypeHeader = headers.get('Content-Type')
        expect(contentTypeHeader).to.eql('application/json')
      })
    })

    describe('setLocale', () => {
      test('should set locale if no query params in options', () => {
        const options = {}
        const expectedOptions = {
          queryParams: {
            locale: 'fr'
          }
        }
        
        return expectSaga(setLocale, options)
          .provide([
            [select(intl.localeSelector), 'fr']
          ])
          .returns(expectedOptions)
          .run()
      })

      test('should set locale if no locale in query params', () => {
        const options = {
          queryParams: {
            foo: 'bar'
          }
        }
        const expectedOptions = {
          queryParams: {
            foo: 'bar',
            locale: 'fr'
          }
        }
        
        return expectSaga(setLocale, options)
          .provide([
            [select(intl.localeSelector), 'fr']
          ])
          .returns(expectedOptions)
          .run()
      })

      test('should override locale if already set in query params', () => {
        const options = {
          queryParams: {
            foo: 'bar',
            locale: 'de'
          }
        }
        const expectedOptions = {
          queryParams: {
            foo: 'bar',
            locale: 'de'
          }
        }
        
        return expectSaga(setLocale, options)
          .provide([
            [select(intl.localeSelector), 'fr']
          ])
          .returns(expectedOptions)
          .run()
      })
    })
  })
})
