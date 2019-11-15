import * as entities from './entities'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        describe('entitiesListTransformer', () => {
          test('should return an array with flatten attributes', () => {
            const fetchResult = {
              data: [
                {
                  _links: null,
                  key: '45',
                  model: 'User',
                  version: 7,
                  paths: {
                    firstname: {
                      type: 'string',
                      writable: null,
                      value: 'Max'
                    },
                    relAddress_c: {
                      type: 'entity',
                      writable: null,
                      value: {
                        _links: null,
                        key: '3195',
                        model: 'Address',
                        version: 0,
                        paths: {
                          canton: {
                            type: 'string',
                            writable: null,
                            value: 'ZH'
                          },
                          relCountry_c: {
                            type: 'entity',
                            writable: null,
                            value: {
                              _links: null,
                              key: '107',
                              model: 'Country',
                              version: 1,
                              paths: {
                                ioc: {
                                  type: 'string',
                                  writable: null,
                                  value: 'SUI'
                                },
                                label: {
                                  type: 'string',
                                  writable: null,
                                  value: 'Schweiz'
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    relUser_code1: {
                      type: 'entity-list',
                      writable: null,
                      value: [
                        {
                          _links: null,
                          key: '2',
                          model: 'User_code1',
                          version: 1,
                          paths: {}
                        },
                        {
                          _links: null,
                          key: '1',
                          model: 'User_code1',
                          version: 1,
                          paths: {}
                        }
                      ]
                    },
                    relUser_code2: {
                      type: 'entity-list',
                      writable: null,
                      value: [
                        {
                          _links: null,
                          key: '2',
                          model: 'User_code2',
                          version: 1,
                          paths: {
                            unique_id: {
                              type: 'identifier',
                              writable: null,
                              value: 'partially_paid'
                            }
                          }
                        },
                        {
                          _links: null,
                          key: '1',
                          model: 'User_code2',
                          version: 1,
                          paths: {
                            unique_id: {
                              type: 'identifier',
                              writable: null,
                              value: 'fully_paid'
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }

            const expectedResult = [
              {
                '__key': '45',
                '__model': 'User',
                'firstname': 'Max',
                'relAddress_c': {model: 'Address', key: '3195'},
                'relAddress_c.canton': 'ZH',
                'relAddress_c.relCountry_c': {key: '107', model: 'Country'},
                'relAddress_c.relCountry_c.label': 'Schweiz',
                'relAddress_c.relCountry_c.ioc': 'SUI',
                'relUser_code1': [{model: 'User_code1', key: '2'}, {model: 'User_code1', key: '1'}],
                'relUser_code2': [{key: '2', model: 'User_code2'}, {key: '1', model: 'User_code2'}],
                'relUser_code2.unique_id': ['partially_paid', 'fully_paid']
              }
            ]

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult).to.eql(expectedResult)
          })

          test('should add __key to entity', () => {
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

          test('should handle path type display-expression', () => {
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
            expect(transformedResult[0].title).to.eql('<p>TEST 1</p>')

            expect(transformedResult[1]).to.have.property('title')
            expect(transformedResult[1].title).to.eql('<p>TEST 2</p>')
          })
        })
      })
    })
  })
})
