import {call} from 'redux-saga/effects'
import {requestSaga, getRequestSaga} from 'tocco-util/src/rest'
import * as entities from './entities'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        describe('fetchEntities', () => {
          it('should fetch the data', () => {
            const gen = entities.fetchEntities('User', {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              fields: ['f1', 'f2'],
              searchInputs: {_search: 'test'},
              formName: 'User_list'
            })

            expect(gen.next().value).to.eql(call(getRequestSaga, 'entities/User', {
              _filter: '',
              _form: 'User_list',
              _limit: 20,
              _offset: 20,
              _paths: 'f1,f2',
              _search: 'test',
              _sort: undefined
            }, []))

            const resp = {
              body: {
                data: [{fields: {a: 'a'}}]
              }
            }

            const next = gen.next(resp)

            expect(next.value).to.eql(resp.body)
            expect(next.done).to.be.true
          })
        })

        describe('fetchEntityCount', () => {
          it('should call fetch and return correct amount', () => {
            const gen = entities.fetchEntityCount('User', {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              fields: ['f1', 'f2'],
              searchInputs: {_search: 'test'},
              formName: 'User_list'
            })

            expect(gen.next().value).to.eql(call(getRequestSaga, 'entities/User/count', {
              _filter: '',
              _form: 'User_list',
              _limit: 20,
              _offset: 20,
              _paths: 'f1,f2',
              _search: 'test',
              _sort: undefined
            }, []))

            const resp = {
              body: {count: 99}
            }

            const next = gen.next(resp)

            expect(next.value).to.eql(resp.body.count)
            expect(next.done).to.be.true
          })
        })

        describe('entitiesListTransformer', () => {
          it('should return an array with flatten attributes', () => {
            const fetchResult = {
              data: [
                {
                  paths: {
                    firstname: {
                      type: 'field',
                      value: {
                        type: 'string',
                        value: 'Jon'
                      }
                    },
                    relGender: {
                      type: 'entity',
                      value: {
                        key: '1',
                        model: 'Gender',
                        display: 'Male'
                      }
                    },
                    titles: {
                      type: 'entity-list',
                      value: [{
                        key: '1',
                        model: 'title',
                        display: 'Dr.'
                      }, {
                        key: '3',
                        model: 'title',
                        display: 'Bundesrat'
                      }]
                    }
                  }
                },
                {
                  paths: {
                    firstname: {
                      type: 'field',
                      value: {
                        type: 'string',
                        value: 'Klaus'
                      }
                    },
                    relGender: {
                      type: 'entity',
                      value: {
                        key: '1',
                        model: 'Gender',
                        display: 'Female'
                      }
                    },
                    titles: {
                      type: 'entity-list',
                      value: [{
                        key: '1',
                        model: 'title',
                        display: 'Dr.'
                      }, {
                        key: '2',
                        model: 'title',
                        display: 'Prof'
                      }]
                    }
                  }
                }
              ]
            }

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult).to.be.a('array')
            expect(transformedResult).to.have.length(2)

            expect(transformedResult[0]).to.have.property('firstname')
            expect(transformedResult[0]).to.have.property('relGender')
            expect(transformedResult[0].firstname).to.eql({type: 'string', value: 'Jon'})
            expect(transformedResult[0].relGender).to.eql({type: 'string', value: 'Male'})
            expect(transformedResult[0].titles).to.eql({type: 'string', value: 'Dr., Bundesrat'})

            expect(transformedResult[1]).to.have.property('firstname')
            expect(transformedResult[1]).to.have.property('relGender')
            expect(transformedResult[1].firstname).to.eql({type: 'string', value: 'Klaus'})
            expect(transformedResult[1].titles).to.eql({type: 'string', value: 'Dr., Prof'})
          })

          it('should add __key to entity', () => {
            const fetchResult = {
              data: [
                {
                  key: 1,
                  paths: {}
                }, {
                  key: 22,
                  paths: {}
                }
              ]
            }

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult[0]).to.have.property('__key')
            expect(transformedResult[0].__key).to.eql(1)

            expect(transformedResult[1]).to.have.property('__key')
            expect(transformedResult[1].__key).to.eql(22)
          })

          it('should handle path type display-expression', () => {
            const fetchResult = {
              data: [
                {
                  paths: {
                    title: {
                      name: 'title',
                      type: 'display-expression',
                      value: '<p>TEST 1</p>'
                    }
                  }
                }, {
                  paths: {
                    title: {
                      name: 'title',
                      type: 'display-expression',
                      value: '<p>TEST 2</p>'
                    }
                  }
                }
              ]
            }

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult).to.be.a('array')
            expect(transformedResult).to.have.length(2)

            expect(transformedResult[0]).to.have.property('title')
            expect(transformedResult[0].title).to.eql({type: 'html', value: '<p>TEST 1</p>'})

            expect(transformedResult[1]).to.have.property('title')
            expect(transformedResult[1].title).to.eql({type: 'html', value: '<p>TEST 2</p>'})
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
                  relationName: 'relUser_status',
                  targetEntity: 'User_status'
                }]
              }
            }

            const next = gen.next(resp)

            expect(next.value).to.eql({
              firstname: {
                fieldName: 'firstname'
              },
              relUser_status: {
                targetEntity: 'User_status',
                type: 'relation'
              }
            })
            expect(next.done).to.be.true
          })
        })

        describe('defaultModelTransformer', () => {
          it('should return an object with field names as key', () => {
            const fetchResult = {
              'name': 'User',
              'fields': [
                {
                  'fieldName': 'pk',
                  'type': 'serial'
                },
                {
                  'fieldName': 'firstname',
                  'type': 'string'
                }
              ],
              'relations': [
                {
                  'relationName': 'some_relation',
                  'targetEntity': 'Address',
                  'multi': true
                }
              ]
            }
            const result = entities.defaultModelTransformer(fetchResult)
            const expectedResult = {
              pk: {
                'fieldName': 'pk',
                type: 'serial'

              },
              firstname: {
                'fieldName': 'firstname',
                type: 'string'
              },
              some_relation: {
                type: 'relation',
                targetEntity: 'Address'
              }
            }
            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
