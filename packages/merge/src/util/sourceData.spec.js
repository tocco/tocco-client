import {getDataRows, getColumnDefinition} from './sourceData'

describe('merge', () => {
  describe('utils', () => {
    describe('sourceData', () => {
      describe('getDataRows', () => {
        test('should return row for each path and relation', () => {
          const sourceData = {
            entities: [
              {
                key: '1',
                model: 'User',
                paths: {
                  firstname: {
                    type: 'string',
                    value: 'Firstname'
                  },
                  age: {
                    type: 'number',
                    value: 8
                  }
                }
              },
              {
                key: '2',
                model: 'User',
                paths: {
                  firstname: {
                    type: 'string',
                    value: 'Firstname2'
                  },
                  age: {
                    type: 'number',
                    value: null
                  }
                }
              }
            ],
            relations: [
              {
                entityKey: '1',
                relationName: 'relMail',
                keys: ['2']
              },
              {
                entityKey: '2',
                relationName: 'relMail',
                keys: ['3']
              },
              {
                entityKey: '1',
                relationName: 'relPrincipal',
                keys: ['1']
              },
              {
                entityKey: '2',
                relationName: 'relPrincipal',
                keys: []
              }
            ]
          }

          const expectedResult = [
            {
              1: {
                type: 'string',
                value: 'Firstname'
              },
              2: {
                type: 'string',
                value: 'Firstname2'
              },
              __key: 'firstname'
            },
            {
              1: {
                type: 'number',
                value: 8
              },
              2: {
                type: 'number',
                value: null
              },
              __key: 'age'
            },
            {
              1: {
                type: 'relations',
                value: ['2']
              },
              2: {
                type: 'relations',
                value: ['3']
              },
              __key: 'relMail'
            },
            {
              1: {
                type: 'relations',
                value: ['1']
              },
              2: {
                type: 'relations',
                value: []
              },
              __key: 'relPrincipal'
            }
          ]

          expect(getDataRows(sourceData)).to.eql(expectedResult)
        })

        test('should set displays for relation types', () => {
          const sourceData = {
            entities: [
              {
                key: '1',
                model: 'User',
                paths: {
                  relGender: {
                    type: 'entity',
                    value: {
                      model: 'Gender',
                      key: '1'
                    }
                  },
                  relGender2: {
                    type: 'entity-list',
                    value: [{
                      model: 'Gender',
                      key: '2'
                    }, {
                      model: 'Gender',
                      key: '1'
                    }]
                  }
                }
              }
            ],
            relations: [],
            displays: [
              {
                model: 'Gender',
                values: [
                  {
                    key: '1',
                    display: 'Male'
                  },
                  {
                    key: '2',
                    display: 'Female'
                  }
                ]
              }
            ]
          }

          const expectedResult = [
            {
              1: {
                type: 'entity',
                value: {
                  display: 'Male',
                  key: '1',
                  model: 'Gender'
                }
              },
              __key: 'relGender'
            },
            {
              1: {
                type: 'entity-list',
                value: [
                  {
                    display: 'Female',
                    key: '2',
                    model: 'Gender'
                  }, {
                    display: 'Male',
                    key: '1',
                    model: 'Gender'
                  }
                ]
              },
              __key: 'relGender2'
            }
          ]

          expect(getDataRows(sourceData)).to.eql(expectedResult)
        })
      })
      describe('getColumnDefinition', () => {
        test('should return a column for each entity and a label columns with according labels', () => {
          const sourceData = {
            entities: [
              {
                key: '1',
                model: 'User',
                paths: {
                  firstname: {
                    type: 'string',
                    value: 'Firstname'
                  }
                }
              },
              {
                key: '2',
                model: 'User',
                paths: {
                  firstname: {
                    type: 'string',
                    value: 'Firstname2'
                  }
                }
              }
            ],
            relations: [],
            displays: [
              {
                model: 'User',
                values: [
                  {
                    key: '1',
                    display: 'User 1'
                  },
                  {
                    key: '2',
                    display: 'User 2'
                  }
                ]
              }
            ]
          }

          const result = getColumnDefinition(sourceData)

          expect(result).to.have.length(3)
          expect(result.some(c => c.entityKey === '1')).to.be.true
          expect(result.find(c => c.entityKey === '1').label).to.eql('User 1')
          expect(result.some(c => c.entityKey === '2')).to.be.true
          expect(result.find(c => c.entityKey === '2').label).to.eql('User 2')
        })
      })
    })
  })
})
