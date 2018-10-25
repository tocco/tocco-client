import _get from 'lodash/get'
import fetchMock from 'fetch-mock'

import {setupEntities} from './entities'
import {createUsers} from './entityFactory'
import {simpleRequest} from '../rest'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('entities', () => {
      describe('setupEntities', () => {
        test('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const deleteSpy = sinon.spy()
          const fetchMockMock = {
            get: getSpy,
            delete: deleteSpy
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
          }
        )

        test('should setup a entities and return only a few a searchstring', done => {
          const users = createUsers(50)
          setupEntities(fetchMock, {User: users})
          const resource = 'http://localhost:8080/nice2/rest/entities/User'
          const queryParams = {
            _limit: 50,
            _search: 'few'
          }

          simpleRequest(resource, {queryParams}).then(res => {
            const records = res.body.data
            expect(records.length).to.be.lessThan(50)
            done()
          })
        })

        test('should setup a entities and return only a few with a query', done => {
          const users = createUsers(50)
          setupEntities(fetchMock, {User: users})
          const resource = 'http://localhost:8080/nice2/rest/entities/User'
          const queryParams = {
            _limit: 50,
            _search: 'few'
          }

          simpleRequest(resource, {queryParams}).then(res => {
            const records = res.body.data
            expect(records.length).to.be.lessThan(50)
            done()
          })
        })
      })
    })
  })
})
