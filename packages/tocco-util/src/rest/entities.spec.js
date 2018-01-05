import * as entities from './entities'
import {requestSaga} from './rest'
import {call} from 'redux-saga/effects'

describe('tocco-util', () => {
  describe('rest', () => {
    describe('entities', () => {
      describe('buildParams', () => {
        it('should call fetch return object of valid params', () => {
          const options = {
            page: 2,
            orderBy: 'firstname',
            limit: 20,
            paths: ['f1', 'f2'],
            searchInputs: {_search: 'test'}
          }

          const params = entities.buildParams(options)

          const expectedParams = {
            _fields: null,
            _filter: '',
            _form: undefined,
            _limit: 20,
            _offset: 20,
            _paths: 'f1,f2',
            _relations: null,
            _search: 'test',
            _sort: undefined
          }

          expect(params).to.eql(expectedParams)
        })

        it('should set exclamation mark for fields and relations if explicitly empty', () => {
          const options = {
            page: 2,
            orderBy: 'firstname',
            limit: 20,
            fields: [],
            relations: [],
            searchInputs: {_search: 'test'}
          }

          const params = entities.buildParams(options)

          const expectedParams = {
            _fields: '!',
            _filter: '',
            _form: undefined,
            _limit: 20,
            _offset: 20,
            _paths: '',
            _relations: '!',
            _search: 'test',
            _sort: undefined
          }

          expect(params).to.eql(expectedParams)
        })
      })

      describe('fetchEntities', () => {
        it('should call fetch', () => {
          const params = {
            page: 2,
            orderBy: 'firstname',
            limit: 20,
            paths: ['f1', 'f2'],
            searchInputs: {_search: 'test'}
          }

          const queryParams = {
            _fields: null,
            _filter: '',
            _form: undefined,
            _limit: 20,
            _offset: 20,
            _paths: 'f1,f2',
            _relations: null,
            _search: 'test',
            _sort: undefined
          }

          const gen = entities.fetchEntities('User', params)
          expect(gen.next().value).to.eql(call(entities.buildParams, params))
          expect(gen.next(queryParams).value).to.eql(call(requestSaga, 'entities/User', {queryParams}))

          const resp = {
            body: {}
          }

          expect(gen.next(resp).value).to.eql(call(entities.defaultTransformer, resp.body))

          const transformedResponse = {}

          const next = gen.next(transformedResponse)

          expect(next.value).to.equal(transformedResponse) // expect same (not just equal)
          expect(next.done).to.be.true
        })
      })
    })
  })
})
