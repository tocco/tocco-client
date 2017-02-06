import * as entities from './entities'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('fetchEntities', () => {
          it('should call fetch', () => {
            fetchMock.get('*', {data: [{fields: {a: 'a'}}]})

            const fields = ['f1', 'f2']
            return entities.fetchEntities('User', 2, 'firstname', 20, fields, {_search: 'test'}).then(() => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCall = fetchMock.lastCall()[0]
              expect(lastCall).to.eql('/nice2/rest/entities/User?_limit=20&_offset=20&_paths=f1%2Cf2&_search=test')
            })
          })
        })

        describe('fetchEntity', () => {
          it('should call fetch', () => {
            fetchMock.get('*', {data: [{fields: {a: 'a'}}]})

            const fields = ['f1', 'f2']
            return entities.fetchEntity('User', 99, fields).then(() => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCall = fetchMock.lastCall()[0]
              expect(lastCall).to.eql('/nice2/rest/entities/User/99?_paths=f1%2Cf2')
            })
          })
        })

        describe('fetchEntityCount', () => {
          it('should call fetch and return correct amount', () => {
            fetchMock.get('*', {count: 99})
            return entities.fetchEntityCount('User').then(result => {
              expect(result).to.be.eql(99)

              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/entities/User/count')
            })
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
                }, {
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
            expect(transformedResult[0].values).to.have.property('firstname')
            expect(transformedResult[0].values).to.have.property('relGender')
            expect(transformedResult[0].values.firstname).to.eql({type: 'string', value: 'Jon'})
            expect(transformedResult[0].values.relGender).to.eql({type: 'string', value: 'Male'})
            expect(transformedResult[0].values.titles).to.eql({type: 'string', value: 'Dr., Bundesrat'})

            expect(transformedResult[1].values).to.have.property('firstname')
            expect(transformedResult[1].values).to.have.property('relGender')
            expect(transformedResult[1].values.firstname).to.eql({type: 'string', value: 'Klaus'})
            expect(transformedResult[1].values.titles).to.eql({type: 'string', value: 'Dr., Prof'})
          })
        })

        describe('combineEntitiesInObject', () => {
          it('should transform array of entities into object', () => {
            const data = [
              {
                metaData: {
                  modelName: 'User_code2'
                },
                data: [
                  {
                    display: 'CEO',
                    key: '33'
                  }
                ]
              },
              {
                metaData: {
                  modelName: 'Gender'
                },
                data: [
                  {
                    display: 'M',
                    key: '1'
                  },
                  {
                    display: 'F',
                    key: '2'
                  }
                ]
              }
            ]

            const expectedResult = {
              User_code2: [
                {
                  displayName: 'CEO',
                  value: '33'
                }
              ],
              Gender: [
                {
                  displayName: 'M',
                  value: '1'
                },
                {
                  displayName: 'F',
                  value: '2'
                }
              ]
            }
            const transformedResult = entities.combineEntitiesInObject(data)
            expect(transformedResult).to.eql(expectedResult)
          })
        })

        describe('fetchModel', () => {
          it('should call fetch', () => {
            fetchMock.get('*', {})
            return entities.fetchModel('User', () => {}).then(() => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/entities/User/model')
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

        describe('getInitialSelectBoxStore', () => {
          it('should return a store array for a field of type entity', () => {
            const paths = {
              singleSelect: {
                type: 'entity',
                value: {
                  key: '1',
                  display: 'Label'
                }
              }
            }

            const expectedResult = [{
              key: 'singleSelect',
              store: [
                {value: '1', label: 'Label'}
              ]
            }]

            const result = entities.getInitialSelectBoxStore(paths)
            expect(result).to.eql(expectedResult)
          })

          it('should return a store array for a field of the type entity-list', () => {
            const paths = {
              singleSelect: {
                type: 'entity-list',
                value: [
                  {key: '1', display: 'Label1'},
                  {key: '2', display: 'Label2'}
                ]
              }
            }

            const expectedResult = [{
              key: 'singleSelect',
              store: [
                {value: '1', label: 'Label1'},
                {value: '2', label: 'Label2'}
              ]
            }]

            const result = entities.getInitialSelectBoxStore(paths)
            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
