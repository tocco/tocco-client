import _get from 'lodash/get'
import fetchMock from 'fetch-mock'

import {setupEntities} from './entities'
import {createUsers} from './entityFactory'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('entities', () => {
      describe('setupEntities', () => {
        test('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const postSpy = sinon.spy()
          const fetchMockMock = {
            get: getSpy,
            post: postSpy
          }

          const entityStore = {}

          setupEntities(fetchMockMock, entityStore)
          expect(getSpy).to.be.called
        })

        test(
          'should setup a entities get with working limit, offset and sorting',
          done => {
            const users = createUsers(50)
            setupEntities(fetchMock, {User: users})
            const url = 'http://localhost:8080/nice2/rest/entities/2.0/User?_limit=5&_offset=10&_sort=firstname desc'

            fetch(url, {method: 'GET'}).then(res => res.json())
              .then(res => {
                const records = res.data
                const fistNameSelector = 'paths.firstname.value'
                expect(records.length).to.eql(5)

                expect(_get(records[0], fistNameSelector)).to.eql('Firstname 39')
                expect(_get(records[1], fistNameSelector)).to.eql('Firstname 38')
                done()
              })
          }
        )

        test('should setup a entities and return only a few a searchstring', done => {
          const users = createUsers(50)
          setupEntities(fetchMock, {User: users})
          const url = 'http://localhost:8080/nice2/rest/entities/2.0/User?_limit=50&_search=few'

          fetch(url, {method: 'GET'}).then(res => res.json())
            .then(res => {
              const records = res.data
              expect(records.length).to.be.lessThan(50)
              done()
            })
        })

        test('should setup a entities and return only a few with a query', done => {
          const users = createUsers(50)
          setupEntities(fetchMock, {User: users})
          const resource = 'http://localhost:8080/nice2/rest/entities/2.0/User'
          const queryParams = {
            method: 'GET',
            _limit: 50,
            _search: 'few'
          }

          fetch(resource, {queryParams}).then(res => res.json()).then(res => {
            const records = res.data
            expect(records.length).to.be.lessThan(50)
            done()
          })
        })
      })
    })
  })
})
