import {call} from 'redux-saga/effects'
import {requestSaga, getRequestSaga} from 'tocco-util/src/rest'
import * as entities from './entities'
import fetchMock from 'fetch-mock'

describe('entity-detail', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
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
            const gen = entities.fetchEntities('User', params)

            const expectedSagaParams = {
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
            expect(gen.next().value).to.eql(call(getRequestSaga, 'entities/User', expectedSagaParams, []))

            const resp = {
              body: {}
            }

            const next = gen.next(resp)

            expect(next.value).to.equal(resp.body) // expect same (not just equal)
            expect(next.done).to.be.true
          })

          it('should set exclamation mark for fields and relations if explicitly empty', () => {
            const params = {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              fields: [],
              relations: [],
              searchInputs: {_search: 'test'}
            }
            const gen = entities.fetchEntities('User', params)

            const expectedSagaParams = {
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
            expect(gen.next().value).to.eql(call(getRequestSaga, 'entities/User', expectedSagaParams, []))

            const resp = {
              body: {}
            }

            const next = gen.next(resp)

            expect(next.value).to.equal(resp.body) // expect same (not just equal)
            expect(next.done).to.be.true
          })
        })

        describe('fetchEntity', () => {
          it('should call fetch', () => {
            const gen = entities.fetchEntity('User', 99, ['f1', 'f2'], 'User_detail')

            expect(gen.next().value).to.eql(call(requestSaga, 'entities/User/99', {
              _form: 'User_detail',
              _paths: 'f1,f2'
            }))

            const resp = {
              body: {}
            }

            const next = gen.next(resp)

            expect(next.value).to.equal(resp.body) // expect same (not just equal)
            expect(next.done).to.be.true
          })
        })

        describe('fetchModel', () => {
          it('should call request saga and transform response', () => {
            const gen = entities.fetchModel('User')

            expect(gen.next().value).to.eql(call(requestSaga, 'entities/User/model'))

            const resp = {
              body: {
                name: 'User',
                fields: [{
                  fieldName: 'firstname'
                }],
                relations: [{
                  relationName: 'relUser_status'
                }]
              }
            }

            const next = gen.next(resp)

            expect(next.value).to.eql({
              firstname: {
                fieldName: 'firstname'
              },
              relUser_status: {
                relationName: 'relUser_status',
                type: 'relation'
              }
            })
            expect(next.done).to.be.true
          })

          describe('defaultModelTransformer', () => {
            it('should return an object with field names as key', () => {
              const fetchResult = {
                name: 'User',
                fields: [
                  {
                    fieldName: 'pk',
                    type: 'serial'
                  },
                  {
                    fieldName: 'firstname',
                    type: 'string'
                  }
                ],
                relations: [
                  {
                    relationName: 'some_relation',
                    targetEntity: 'Address',
                    multi: true
                  }
                ]
              }
              const result = entities.defaultModelTransformer(fetchResult)
              const expectedResult = {
                pk: {
                  fieldName: 'pk',
                  type: 'serial'

                },
                firstname: {
                  fieldName: 'firstname',
                  type: 'string'
                },
                some_relation: {
                  type: 'relation',
                  relationName: 'some_relation',
                  targetEntity: 'Address',
                  multi: true
                }
              }
              expect(result).to.eql(expectedResult)
            })
          })
        })
      })
    })
  })
})
