import {getParameterString, fetchRequest} from './rest'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
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
      })

      describe('fetchRequest', () => {
        it('should order params', () => {
          const resource = 'Entities/Contact'
          const params = {
            _search: 'test',
            xyz: 'abc'
          }
          fetchRequest(resource, params)

          const lastCall = fetchMock.lastCall()[0]
          expect(lastCall).to.eql('/nice2/rest/Entities/Contact?_search=test&xyz=abc')
        })
      })
    })
  })
})

