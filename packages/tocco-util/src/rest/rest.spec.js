import {getParameterString, request, setNullBusinessUnit} from './rest'
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

    describe('Request', () => {
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
        const resource = 'Entities/Contact'
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
        const resource = 'Entities/Contact'
        request(resource, {}, 'GET', {}, []).catch(() => {
          done()
        })
      })

      it('should set content type header', () => {
        fetchMock.get('*', {})

        request('', {}, 'GET', {}, [])

        const headerObject = fetchMock.lastOptions().headers.map
        expect(headerObject).to.have.property('content-type')
      })

      it('should set null business unit header', () => {
        fetchMock.get('*', {})

        request('', {}, 'GET', {}, [])
        const headerObject = fetchMock.lastOptions().headers.map
        expect(headerObject).to.not.property('x-business-unit')

        setNullBusinessUnit(true)
        request('', {}, 'GET', {}, [])
        const headerObject2 = fetchMock.lastOptions().headers.map
        expect(headerObject2).to.have.property('x-business-unit')
      })

      it('should use ordered params', () => {
        fetchMock.get('*', {})
        const resource = 'Entities/Contact'
        const params = {
          _search: 'test',
          xyz: 'abc'
        }
        request(resource, params)

        const lastCall = fetchMock.lastCall()[0]
        expect(lastCall).to.eql('/nice2/rest/Entities/Contact?_search=test&xyz=abc')
      })
    })
  })
})
