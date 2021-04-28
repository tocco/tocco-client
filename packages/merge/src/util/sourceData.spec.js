import {getDataRows, getColumnDefinition, getDisplay} from './sourceData'

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
                relationEntity: 'Mail',
                keys: ['2'],
                totalKeys: 1
              },
              {
                entityKey: '2',
                relationName: 'relMail',
                relationEntity: 'Mail',
                keys: ['3'],
                totalKeys: 1
              },
              {
                entityKey: '1',
                relationName: 'relPrincipal',
                relationEntity: 'Principal',
                keys: ['1'],
                totalKeys: 1
              },
              {
                entityKey: '2',
                relationName: 'relPrincipal',
                relationEntity: 'Principal',
                keys: [],
                totalKeys: 2
              }
            ],
            labels: {
              firstname: 'Firstname',
              age: 'Age',
              relMail: 'Mail',
              relPrincipal: 'Principal'
            }
          }

          const expectedResult = [
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
                type: 'relations',
                value: {
                  keys: ['2'],
                  totalKeys: 1,
                  relationEntity: 'Mail'
                }
              },
              2: {
                type: 'relations',
                value: {
                  keys: ['3'],
                  totalKeys: 1,
                  relationEntity: 'Mail'
                }
              },
              __key: 'relMail'
            },
            {
              1: {
                type: 'relations',
                value: {
                  keys: ['1'],
                  totalKeys: 1,
                  relationEntity: 'Principal'
                }
              },
              2: {
                type: 'relations',
                value: {
                  keys: [],
                  totalKeys: 2,
                  relationEntity: 'Principal'
                }
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
            ],
            labels: {
              relGender: 'Gender',
              relGender2: 'Gender2'
            }
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
          expect(result[0].id).to.be.eql('column-label')
          expect(result[1].id).to.be.eql('1')
          expect(result[2].id).to.be.eql('2')
          expect(result.some(c => c.entityKey === '1')).to.be.true
          expect(result.some(c => c.entityKey === '2')).to.be.true
        })
      })

      describe('getDisplay', () => {
        const sourceData = {
          displays: [
            {
              model: 'User',
              values: [
                {
                  key: '1',
                  display: 'User 1'
                }
              ]
            }
          ]
        }

        test('return display', () => {
          expect(getDisplay(sourceData, 'User', '1')).to.be.eql('User 1')
        })

        test('model not present return fallback display', () => {
          expect(getDisplay(sourceData, 'Address', '1')).to.be.eql('PK: 1')
        })

        test('key not present return fallback display', () => {
          expect(getDisplay(sourceData, 'User', '2')).to.be.eql('PK: 2')
        })
      })
    })
  })
})
