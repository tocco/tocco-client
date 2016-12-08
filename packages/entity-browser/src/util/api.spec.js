import * as api from './api'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      describe('getParameterString', () => {
        it('should order params', () => {
          const params = {
            'param1': 'val1',
            'param3': 'val3',
            'param2': 'val2'
          }
          const res = api.getParameterString(params)

          expect(res).to.eql('?param1=val1&param2=val2&param3=val3')
        })

        it('should remove empty params', () => {
          const params = {
            'param1': '',
            'param2': 'val2'
          }
          const res = api.getParameterString(params)

          expect(res).to.eql('?param2=val2')
        })

        it('should decode string', () => {
          const params = {
            'param1': '%'
          }
          const res = api.getParameterString(params)

          expect(res).to.eql('?param1=%25')
        })
      })

      describe('fetchRecord', () => {
        it('should call fetch', done => {
          fetchMock.reset()
          fetchMock.get('*', {data: [{fields: {a: 'a'}}]})

          const columneDefinition = [{label: 'l1', value: ['f1', 'f2']}, {label: 'l1', value: ['f2']}]
          api.fetchRecords('User', 2, 'firstname', 20, 'test', columneDefinition).then(() => {
            expect(fetchMock.calls().matched).to.have.length(1)
            const lastCall = fetchMock.lastCall()[0]
            expect(lastCall).to.eql('/nice2/rest/entities/User?_limit=20&_offset=20&_path=f1%2Cf2&_search=test')
            done()
          })
        })
      })

      describe('fetchRecordCount', () => {
        it('should call fetch and return corect amount', done => {
          fetchMock.get('*', {count: 99})
          api.fetchRecordCount('User').then(result => {
            expect(result).to.be.eql(99)
            expect(fetchMock.calls().matched).to.have.length(1)
            const lastCallUrl = fetchMock.lastCall()[0]
            expect(lastCallUrl).to.eql('/nice2/rest/entities/User/count')
            done()
          })
        })
      })
    })
  })
})
