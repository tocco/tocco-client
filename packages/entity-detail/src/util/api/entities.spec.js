import {rest} from 'tocco-app-extensions'
import fetchMock from 'fetch-mock'
import {call} from 'redux-saga/effects'

import * as entities from './entities'

describe('entity-detail', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('fetchEntities', () => {
          test('should call fetch', () => {
            const params = {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              paths: ['f1', 'f2'],
              searchInputs: {_search: 'test'}
            }
            const gen = entities.fetchEntities('User', params)

            expect(gen.next().value).to.eql(call(rest.requestSaga, 'entities/User', {
              queryParams: {
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
            }))

            const resp = {
              body: {}
            }

            expect(gen.next(resp).value).to.eql(call(entities.defaultEntitiesTransformer, resp.body))

            const transformedResponse = {
            }

            const next = gen.next(transformedResponse)

            expect(next.value).to.equal(transformedResponse) // expect same (not just equal)
            expect(next.done).to.be.true
          })

          test(
            'should set exclamation mark for fields and relations if explicitly empty',
            () => {
              const params = {
                page: 2,
                orderBy: 'firstname',
                limit: 20,
                fields: [],
                relations: [],
                searchInputs: {_search: 'test'}
              }
              const gen = entities.fetchEntities('User', params)

              expect(gen.next().value).to.eql(call(rest.requestSaga, 'entities/User', {
                queryParams: {
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
              }))

              const resp = {
                body: {}
              }

              expect(gen.next(resp).value).to.eql(call(entities.defaultEntitiesTransformer, resp.body))

              const transformedResponse = {
              }

              const next = gen.next(transformedResponse)

              expect(next.value).to.equal(transformedResponse) // expect same (not just equal)
              expect(next.done).to.be.true
            }
          )
        })

        describe('fetchEntity', () => {
          test('should call fetch', () => {
            const gen = entities.fetchEntity('User', 99, ['f1', 'f2'], 'User_detail')

            expect(gen.next().value).to.eql(call(rest.requestSaga, 'entities/User/99', {
              queryParams: {
                _form: 'User_detail',
                _paths: 'f1,f2'
              }
            }))

            const resp = {
              body: {}
            }

            const next = gen.next(resp)

            expect(next.value).to.equal(resp.body) // expect same (not just equal)
            expect(next.done).to.be.true
          })
        })

        describe('updateEntity', () => {
          test('should call request saga', () => {
            const entity = {
              model: 'User',
              key: '1'
            }

            const gen = entities.updateEntity(entity, ['f1', 'f2'])

            expect(gen.next().value).to.eql(call(
              rest.requestSaga,
              'entities/User/1',
              {
                body: entity,
                method: 'PATCH',
                queryParams: {
                  _paths: 'f1,f2'
                },
                acceptedErrorCodes: ['VALIDATION_FAILED']
              }
            ))

            const resp = {
              body: {}
            }

            const next = gen.next(resp)

            expect(next.value).to.equal(resp.body) // expect same (not just equal)
            expect(next.done).to.be.true
          })
        })

        describe('fetchModel', () => {
          test('should call request saga and transform response', () => {
            const gen = entities.fetchModel('User')

            expect(gen.next().value).to.eql(call(rest.requestSaga, 'entities/User/model'))

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

            expect(gen.next(resp).value).to.eql(call(entities.defaultModelTransformer, resp.body))

            const transformedResponse = {
              firstname: {
                fieldName: 'firstname'
              },
              relUser_status: {
                relationName: 'relUser_status',
                type: 'relation'
              }
            }

            const next = gen.next(transformedResponse)

            expect(next.value).to.eql(transformedResponse)
            expect(next.done).to.be.true
          })
        })

        describe('defaultModelTransformer', () => {
          test('should return an object with field names as key', () => {
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
