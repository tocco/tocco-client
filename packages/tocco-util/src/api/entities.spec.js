import {getFlattenEntity, toEntity} from './entities'

describe('tocco-util', () => {
  describe('api', () => {
    describe('getEntityObject', () => {
      test('should set key, model and version', () => {
        const entity = {
          version: 1,
          key: '23',
          model: 'User'
        }

        const result = getFlattenEntity(entity)

        expect(result.__key).to.eql('23')
        expect(result.__version).to.eql(1)
        expect(result.__model).to.eql('User')
      })

      test('should set simple paths', () => {
        const entity = {
          paths: {
            firstname: {
              type: 'string',
              writable: null,
              value: 'Peter'
            },
            birthdate: {
              type: 'birthdate',
              writable: null,
              value: '2019-11-27'
            }
          }
        }

        const result = getFlattenEntity(entity)

        expect(result).to.have.property('firstname', 'Peter')
        expect(result).to.have.property('birthdate', '2019-11-27')
      })

      test('should set to 1 relations', () => {
        const entity = {
          paths: {
            relGender: {
              type: 'entity',
              writable: null,
              value: {
                _links: null,
                key: '1',
                model: 'Gender',
                version: 3,
                paths: {}
              }
            }
          }
        }

        const result = getFlattenEntity(entity)

        expect(result.relGender).to.eql({key: '1', model: 'Gender', version: 3})
      })

      test('should set to N relations', () => {
        const entity = {
          paths: {
            relUser_code1: {
              type: 'entity-list',
              writable: null,
              value: [
                {
                  _links: null,
                  key: '1',
                  model: 'User_code1',
                  version: 1,
                  paths: {}
                },
                {
                  _links: null,
                  key: '301',
                  model: 'User_code1',
                  version: 0,
                  paths: {}
                }
              ]
            }
          }
        }

        const result = getFlattenEntity(entity)

        const expectedValue = [
          {key: '1', model: 'User_code1', version: 1},
          {key: '301', model: 'User_code1', version: 0}
        ]

        expect(result.relUser_code1).to.deep.eql(expectedValue)
      })

      test('should handle multi paths', () => {
        const entity = {
          paths: {
            relUser: {
              type: 'entity',
              writable: null,
              value: {
                _links: null,
                key: '1',
                model: 'User',
                version: 340,
                paths: {
                  relNationality: {
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
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        const result = getFlattenEntity(entity)

        expect(result.relUser).to.eql({key: '1', model: 'User', version: 340})
        expect(result['relUser.relNationality']).to.eql({key: '107', model: 'Country', version: 1})
        expect(result['relUser.relNationality.ioc']).to.eql('SUI')
      })

      test('should handle to N multi paths', () => {
        const entity = {
          paths: {
            relUser: {
              type: 'entity',
              writable: null,
              value: {
                _links: null,
                key: '1',
                model: 'User',
                version: 340,
                paths: {
                  relUser_code1: {
                    type: 'entity-list',
                    writable: null,
                    value: [
                      {
                        _links: null,
                        key: '1',
                        model: 'User_code1',
                        version: 1,
                        paths: {
                          active: {
                            type: 'boolean',
                            writable: null,
                            value: true
                          }
                        }
                      },
                      {
                        _links: null,
                        key: '301',
                        model: 'User_code1',
                        version: 0,
                        paths: {
                          active: {
                            type: 'boolean',
                            writable: null,
                            value: false
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }

        const result = getFlattenEntity(entity)

        expect(result.relUser).to.eql({key: '1', model: 'User', version: 340})
        expect(result['relUser.relUser_code1']).to.eql([
          {key: '1', model: 'User_code1', version: 1},
          {key: '301', model: 'User_code1', version: 0}]
        )

        expect(result['relUser.relUser_code1.active']).to.eql([true, false])
      })
    })

    describe('toEntity', () => {
      test('should map dirty values to entity paths', () => {
        const values = {
          firstname: 'peter',
          lastname: 'griffin'
        }

        const dirtyFields = ['firstname', 'lastname']
        const result = toEntity(values, dirtyFields)

        expect(result.paths.firstname).to.eql('peter')
        expect(result.paths.lastname).to.eql('griffin')
      })

      test('should set multi paths correctly', () => {
        const values = {
          'relGender': {key: '2', version: 3, model: 'Gender'},
          'relGender.relXy': {key: '33', version: 4},
          'relGender.relXy.Z': 'TEST'
        }

        const dirtyFields = ['relGender.relXy.Z']
        const result = toEntity(values, dirtyFields)

        const expected = {
          key: '2',
          version: 3,
          paths: {
            relXy: {
              key: '33',
              version: 4,
              paths: {
                Z: 'TEST'
              }
            }
          }
        }

        expect(result.paths.relGender).to.deep.eql(expected)
      })

      test('should ignore pristine fields', () => {
        const values = {
          firstname: 'peter',
          lastname: 'griffin'
        }

        const dirtyFields = ['firstname']
        const result = toEntity(values, dirtyFields)
        expect(result.paths).to.have.property('firstname')
        expect(result.paths).to.not.have.property('lastname')
      })

      test('should simplify object values', () => {
        const values = {
          relGender: {key: '2', version: 3, model: 'Gender', display: 'W'}
        }

        const dirtyFields = ['relGender']
        const result = toEntity(values, dirtyFields)

        expect(result.paths.relGender).to.eql({key: '2', version: 3})
      })

      test('should set model, key and version', () => {
        const values = {
          __version: 3,
          __key: '2',
          __model: 'User'
        }

        const result = toEntity(values, [])

        expect(result.key).to.eql('2')
        expect(result.model).to.eql('User')
        expect(result.version).to.eql(3)
      })
    })
  })
})
