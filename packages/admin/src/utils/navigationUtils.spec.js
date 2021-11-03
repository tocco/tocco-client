import {getCompleteMenuPreferences, getMenuPreferencesKey, prepareMenuTree} from './navigationUtils'

describe('admin', () => {
  describe('utils', () => {
    describe('navigationUtils', () => {
      describe('getMenuPreferencesKey', () => {
        test('should ignore prefix when not set', () => {
          const preferencesPrefix = ''
          const menuTreePath = 'address'

          const key = getMenuPreferencesKey(preferencesPrefix, menuTreePath)

          expect(key).to.equal('admintree.address.collapsed')
        })

        test('should insert prefix when set', () => {
          const preferencesPrefix = 'settings'
          const menuTreePath = 'system.business_unit'

          const key = getMenuPreferencesKey(preferencesPrefix, menuTreePath)

          expect(key).to.equal('admintree.settings.system.business_unit.collapsed')
        })
      })

      describe('getCompleteMenuPreferences', () => {
        test('should flatten menu tree', () => {
          const items = [
            {
              name: 'b',
              children: [
                {
                  name: 'aa'
                },
                {
                  name: 'b',
                  children: [
                    {
                      name: 'aa'
                    }
                  ]
                },
                {
                  name: 'c'
                }
              ]
            },
            {
              name: 'a',
              children: []
            },
            {
              name: 'c',
              children: [
                {
                  name: 'a'
                },
                {
                  name: 'b'
                }
              ]
            }
          ]

          const expectedPreferences = {
            'admintree.prefix.b.collapsed': false,
            'admintree.prefix.b.b.collapsed': false,
            'admintree.prefix.c.collapsed': false
          }

          const preferences = getCompleteMenuPreferences(items, 'prefix', false)

          expect(preferences).to.deep.equal(expectedPreferences)
        })

        test('should handle empty prefix', () => {
          const items = [
            {
              name: 'b',
              children: [
                {
                  name: 'aa'
                },
                {
                  name: 'b',
                  children: [
                    {
                      name: 'aa'
                    }
                  ]
                },
                {
                  name: 'c'
                }
              ]
            },
            {
              name: 'a',
              children: []
            },
            {
              name: 'c',
              children: [
                {
                  name: 'a'
                },
                {
                  name: 'b'
                }
              ]
            }
          ]

          const expectedPreferences = {
            'admintree.b.collapsed': false,
            'admintree.b.b.collapsed': false,
            'admintree.c.collapsed': false
          }

          const preferences = getCompleteMenuPreferences(items, '', false)

          expect(preferences).to.deep.equal(expectedPreferences)
        })
      })

      describe('prepareMenuTree', () => {
        test('should apply search filter', () => {
          const items = [
            {
              name: 'b',
              menuType: 'a',
              children: [
                {
                  name: 'aa',
                  menuType: 'a'
                },
                {
                  name: 'b',
                  menuType: 'a',
                  children: [
                    {
                      name: 'aa',
                      menuType: 'a'
                    }
                  ]
                },
                {
                  name: 'c',
                  menuType: 'a'
                }
              ]
            },
            {
              name: 'a',
              menuType: 'a',
              children: []
            },
            {
              name: 'b',
              menuType: 'a',
              children: [
                {
                  name: 'b',
                  menuType: 'a'
                },
                {
                  name: 'b',
                  menuType: 'a'
                }
              ]
            }
          ]
          const searchFilter = 'a'
          const typeMapping = {
            a: {
              filterAttributes: ['name']
            }
          }

          const expectedPreparedItems = [
            {
              name: 'b',
              menuType: 'a',
              matchingAttribute: undefined,
              level: 0,
              children: [
                {
                  name: 'aa',
                  menuType: 'a',
                  matchingAttribute: 'name',
                  level: 1,
                  children: []
                },
                {
                  name: 'b',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: [
                    {
                      name: 'aa',
                      menuType: 'a',
                      matchingAttribute: 'name',
                      level: 2,
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: 'a',
              menuType: 'a',
              children: [],
              matchingAttribute: 'name',
              level: 0
            }
          ]

          const preparedItems = prepareMenuTree(items, searchFilter, typeMapping)

          expect(preparedItems).to.deep.equal(expectedPreparedItems)
        })

        test('should return all when no search filter is set', () => {
          const items = [
            {
              name: 'b',
              menuType: 'a',
              children: [
                {
                  name: 'aa',
                  menuType: 'a'
                },
                {
                  name: 'b',
                  menuType: 'a',
                  children: [
                    {
                      name: 'aa',
                      menuType: 'a'
                    }
                  ]
                },
                {
                  name: 'c',
                  menuType: 'a'
                }
              ]
            },
            {
              name: 'a',
              menuType: 'a',
              children: []
            },
            {
              name: 'b',
              menuType: 'a',
              children: [
                {
                  name: 'b',
                  menuType: 'a'
                },
                {
                  name: 'b',
                  menuType: 'a'
                }
              ]
            }
          ]
          const searchFilter = ''
          const typeMapping = {
            a: {
              filterAttributes: ['name']
            }
          }

          const expectedPreparedItems = [
            {
              name: 'b',
              menuType: 'a',
              matchingAttribute: undefined,
              level: 0,
              children: [
                {
                  name: 'aa',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                },
                {
                  name: 'b',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: [
                    {
                      name: 'aa',
                      menuType: 'a',
                      matchingAttribute: undefined,
                      level: 2,
                      children: []
                    }
                  ]
                },
                {
                  name: 'c',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                }
              ]
            },
            {
              name: 'a',
              menuType: 'a',
              children: [],
              matchingAttribute: undefined,
              level: 0
            },
            {
              name: 'b',
              menuType: 'a',
              matchingAttribute: undefined,
              level: 0,
              children: [
                {
                  name: 'b',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                },
                {
                  name: 'b',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                }
              ]
            }
          ]

          const preparedItems = prepareMenuTree(items, searchFilter, typeMapping)

          expect(preparedItems).to.deep.equal(expectedPreparedItems)
        })

        test('should apply search filter on folders as well', () => {
          const items = [
            {
              name: 'a',
              menuType: 'a',
              children: [
                {
                  name: 'b',
                  menuType: 'a'
                },
                {
                  name: 'c',
                  menuType: 'a'
                }
              ]
            }
          ]
          const searchFilter = 'a'
          const typeMapping = {
            a: {
              filterAttributes: ['name']
            }
          }

          const expectedPreparedItems = [
            {
              name: 'a',
              menuType: 'a',
              matchingAttribute: 'name',
              level: 0,
              children: [
                {
                  name: 'b',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                },
                {
                  name: 'c',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                }
              ]
            }
          ]

          const preparedItems = prepareMenuTree(items, searchFilter, typeMapping)

          expect(preparedItems).to.deep.equal(expectedPreparedItems)
        })

        test('should count levels', () => {
          const items = [
            {
              name: 'a',
              menuType: 'a',
              children: [
                {
                  name: 'b',
                  menuType: 'a'
                },
                {
                  name: 'c',
                  menuType: 'a',
                  children: [
                    {
                      name: 'd',
                      menuType: 'a'
                    }
                  ]
                }
              ]
            }
          ]
          const searchFilter = ''
          const typeMapping = {
            a: {
              filterAttributes: ['name']
            }
          }

          const expectedPreparedItems = [
            {
              name: 'a',
              menuType: 'a',
              matchingAttribute: undefined,
              level: 0,
              children: [
                {
                  name: 'b',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: []
                },
                {
                  name: 'c',
                  menuType: 'a',
                  matchingAttribute: undefined,
                  level: 1,
                  children: [
                    {
                      name: 'd',
                      menuType: 'a',
                      matchingAttribute: undefined,
                      level: 2,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]

          const preparedItems = prepareMenuTree(items, searchFilter, typeMapping)

          expect(preparedItems).to.deep.equal(expectedPreparedItems)
        })
      })
    })
  })
})
