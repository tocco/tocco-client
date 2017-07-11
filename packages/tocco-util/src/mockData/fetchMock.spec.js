import {setupFetchMock} from './fetchMock'
import _get from 'lodash/get'
import {createUsers} from './entityFactory'
import fetchMock from 'fetch-mock'
import {simpleRequest} from '../rest'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('fetchMock', () => {
      describe('setupFetchMock', () => {
        it('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const fetchMockMock = {
            get: getSpy
          }

          const entityStore = {}

          setupFetchMock(fetchMockMock, entityStore)
          expect(getSpy).to.be.called
        })

        it('should setup a entities get with working limit, offset and sorting', done => {
          const users = createUsers(50)
          setupFetchMock(fetchMock, {User: users})
          const resource = 'http://localhost:8080/nice2/rest/entities/User'
          const queryParams = {
            _limit: 5,
            _offset: 10,
            _sort: 'firstname desc'
          }

          simpleRequest(resource, {queryParams}).then(res => {
            const records = res.body.data
            const fistNameSelector = 'paths.firstname.value.value'
            expect(records.length).to.eql(5)

            expect(_get(records[0], fistNameSelector)).to.eql('Firstname 44')
            expect(_get(records[1], fistNameSelector)).to.eql('Firstname 43')
            done()
          })
        })

        it('should setup a entities get with working search (few keyword)', done => {
          const users = createUsers(50)
          setupFetchMock(fetchMock, {User: users})
          const resource = 'http://localhost:8080/nice2/rest/entities/User'
          const queryParams = {
            _limit: 50,
            _search: 'few'
          }

          simpleRequest(resource, {queryParams}).then(res => {
            const records = res.body.data
            expect(records.length).to.eql(5)
            done()
          })
        })
      })
    })
  })
})
