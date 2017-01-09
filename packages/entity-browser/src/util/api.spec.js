import * as api from './api'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      describe('fetchRecord', () => {
        it('should call fetch', () => {
          fetchMock.get('*', {data: [{fields: {a: 'a'}}]})

          const columnDefinition = [{label: 'l1', value: ['f1', 'f2']}, {label: 'l1', value: ['f2']}]
          return api.fetchRecords('User', 2, 'firstname', 20, columnDefinition, {_search: 'test'}).then(() => {
            expect(fetchMock.calls().matched).to.have.length(1)
            const lastCall = fetchMock.lastCall()[0]
            expect(lastCall).to.eql('/nice2/rest/entities/User?_limit=20&_offset=20&_paths=f1%2Cf2&_search=test')
          })
        })

        it('should return an array with flatten attributes', () => {
          const entityName = 'User'
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

          fetchMock.get(new RegExp(`^.*?/nice2/rest/entities/${entityName}.*`), fetchResult)

          const columnDefinition = [{label: 'Firstname', value: ['firstname']}, {label: 'Gender', value: ['relGender']}]

          return api.fetchRecords(entityName, 2, 'firstname', 20, columnDefinition, {_search: 'test'}).then(res => {
            expect(res).to.be.a('array')
            expect(res).to.have.length(2)
            expect(res[0].values).to.have.property('firstname')
            expect(res[0].values).to.have.property('relGender')
            expect(res[0].values.firstname).to.eql({type: 'string', value: 'Jon'})
            expect(res[0].values.relGender).to.eql({type: 'string', value: 'Male'})
            expect(res[0].values.titles).to.eql({type: 'string', value: 'Dr., Bundesrat'})

            expect(res[1].values).to.have.property('firstname')
            expect(res[1].values).to.have.property('relGender')
            expect(res[1].values.firstname).to.eql({type: 'string', value: 'Klaus'})
            expect(res[1].values.titles).to.eql({type: 'string', value: 'Dr., Prof'})
          })
        })
      })

      describe('fetchRecordCount', () => {
        it('should call fetch and return correct amount', () => {
          fetchMock.get('*', {count: 99})
          return api.fetchRecordCount('User').then(result => {
            expect(result).to.be.eql(99)

            expect(fetchMock.calls().matched).to.have.length(1)
            const lastCallUrl = fetchMock.lastCall()[0]
            expect(lastCallUrl).to.eql('/nice2/rest/entities/User/count')
          })
        })
      })

      describe('fetchRelationRecords', () => {
        it('should fetch entities with a limit', () => {
          fetchMock.get('*', {})

          return api.fetchRelationRecords('User_code1').then(result => {
            expect(fetchMock.calls().matched).to.have.length(1)
            const lastCallUrl = fetchMock.lastCall()[0]
            expect(lastCallUrl).to.eql('/nice2/rest/entities/User_code1?_limit=50')
          })
        })
      })

      describe('transformRelationEntitiesResults', () => {
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

          const transformedResult = api.transformRelationEntitiesResults(data)
          expect(transformedResult).to.eql(expectedResult)
        })
      })

      describe('fetchColumnDefinition', () => {
        it('should call fetch and transform form to ColumnDefinition', () => {
          const fetchResult = {
            form: {
              children: [{
                name: 'table',
                children: [
                  {
                    displayType: 'EDITABLE',
                    label: 'label1',
                    children: [{name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                  }, {
                    displayType: 'HIDDEN',
                    label: 'label2',
                    children: [{name: 'name2', type: 'type', displayType: 'HIDDEN', label: 'label'}]
                  }, {
                    displayType: 'EDITABLE',
                    label: 'label3',
                    children: [{name: 'custom:name3', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                  }, {
                    displayType: 'EDITABLE',
                    label: 'label4',
                    children: [{
                      name: 'name4',
                      type: 'ch.tocco.nice2.model.form.components.action.Action',
                      displayType: 'EDITABLE',
                      label: 'label'
                    }]
                  }, {
                    displayType: 'EDITABLE',
                    label: 'label5',
                    children: [{name: 'name5', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                  }
                ]
              }]
            }
          }

          fetchMock.get('*', fetchResult)
          return api.fetchColumnDefinition('User_list', 'table').then(res => {
            expect(fetchMock.calls().matched).to.have.length(1)
            const lastCallUrl = fetchMock.lastCall()[0]
            expect(lastCallUrl).to.eql('/nice2/rest/forms/User_list')

            const expectedColumnDefinition = [
              {label: 'label1', value: ['name1']},
              {label: 'label3', value: []},
              {label: 'label4', value: []},
              {label: 'label5', value: ['name5']}
            ]
            expect(res).to.eql(expectedColumnDefinition)
          })
        })

        describe('fetchSearchForm', () => {
          it('should call fetch ', () => {
            const fetchResult = require('../dev/test-data/user_search.json')
            fetchMock.get('*', fetchResult)
            return api.fetchSearchForm('User_search').then(res => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/forms/User_search')

              const expectedResult = [
                {
                  name: 'txtFulltext',
                  type: 'ch.tocco.nice2.model.form.components.simple.TextField',
                  displayType: 'EDITABLE',
                  label: 'Person',
                  useLabel: 'YES'
                }
              ]
              expect(res).to.eql(expectedResult)
            })
          })
        })

        describe('fetchModel', () => {
          it('should call fetch and transform result', () => {
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

            fetchMock.get('*', fetchResult)
            return api.fetchModel('User').then(res => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/entities/User/model')
              const expectedResult = {
                pk: {
                  type: 'serial'
                },
                firstname: {
                  type: 'string'
                },
                some_relation: {
                  type: 'relation',
                  targetEntity: 'Address'
                }
              }
              expect(res).to.eql(expectedResult)
            })
          })
        })
      })
    })
  })
})

