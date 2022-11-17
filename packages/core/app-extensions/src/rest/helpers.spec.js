import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {call} from 'redux-saga/effects'
import {cache} from 'tocco-util'

import * as helpers from './helpers'
import {requestSaga} from './rest'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('helpers', () => {
      beforeEach(() => {
        cache.clearAll()
        helpers.clearDisplayCache()
        Object.keys(helpers.formCache).forEach(key => {
          delete helpers.formCache[key]
        })
      })

      describe('buildRequestQuery', () => {
        test('should return an empty object with no options', () => {
          expect(helpers.buildRequestQuery()).to.eql({})
        })

        test('should return object with valid params', () => {
          const options = {
            paths: ['f1', 'f2'],
            conditions: {firstname: 'test'},
            filter: ['filter1', 'filter2'],
            random: 1
          }

          const params = helpers.buildRequestQuery(options)

          const expectedParams = {
            paths: ['f1', 'f2'],
            conditions: {firstname: 'test'},
            filter: ['filter1', 'filter2']
          }

          expect(params).to.eql(expectedParams)
        })

        test('should set exclamation mark for fields and relations if explicitly empty', () => {
          const options = {
            fields: [],
            relations: []
          }

          const params = helpers.buildRequestQuery(options)

          expect(params).to.eql({
            fields: '!',
            relations: '!'
          })
        })

        test('should set sort if sorting is valid', () => {
          const options = {
            sorting: [{field: 'firstname', order: 'desc'}]
          }

          const params = helpers.buildRequestQuery(options)

          expect(params).to.eql({
            sort: 'firstname desc'
          })
        })

        test('should not sort if oderBy is not valid', () => {
          const options = {
            orderBy: [{id: 'firstname'}]
          }

          const params = helpers.buildRequestQuery(options)
          expect(params).to.eql({})
        })

        test('should set limit and offset accordingly', () => {
          const options = {
            limit: 20,
            page: 3
          }

          const params = helpers.buildRequestQuery(options)
          expect(params).to.eql({
            limit: 20,
            offset: 40
          })
        })
      })

      describe('requestQueryToUrlParams', () => {
        test('should prepend lodash to attribute name and join arrays', () => {
          const input = {
            limit: 20,
            offset: 40,
            paths: ['firstname', 'lastname'],
            search: 'asd'
          }

          const expectedResult = {
            _limit: 20,
            _offset: 40,
            _paths: 'firstname,lastname',
            _search: 'asd'
          }
          expect(helpers.requestQueryToUrlParams(input)).to.eql(expectedResult)
        })

        test('should attach conditions to object and let them be arrays', () => {
          const input = {
            limit: 10,
            conditions: {
              firstname: ['dake', 'rott']
            }
          }

          const expectedResult = {
            _limit: 10,
            firstname: ['dake', 'rott']
          }
          expect(helpers.requestQueryToUrlParams(input)).to.eql(expectedResult)
        })
      })

      describe('fetchEntity', () => {
        test('should send POST request', async () => {
          const query = {
            paths: ['firstname', 'lastname']
          }
          const requestOptions = {
            method: 'POST',
            queryParams: {_omitLinks: true},
            body: {paths: ['firstname', 'lastname'], permissions: true}
          }
          const responseEntity = {paths: {firstname: 'Jack'}}

          await expectSaga(helpers.fetchEntity, 'User', '1', query)
            .provide([[matchers.call.fn(requestSaga), {body: responseEntity}]])
            .call(requestSaga, 'entities/2.0/User/1', requestOptions)
            .returns(responseEntity)
            .run()
        })

        test('should send GET request on demand', async () => {
          const query = {
            paths: ['firstname', 'lastname']
          }
          const requestOptions = {
            method: 'GET',
            queryParams: {
              _omitLinks: true,
              _paths: 'firstname,lastname',
              _permissions: true
            }
          }
          const responseEntity = {paths: {firstname: 'Jack'}}

          await expectSaga(helpers.fetchEntity, 'User', '1', query, {method: 'GET'})
            .provide([[matchers.call.fn(requestSaga), {body: responseEntity}]])
            .call(requestSaga, 'entities/2.0/User/1', requestOptions)
            .returns(responseEntity)
            .run()
        })
      })

      describe('entityExists', () => {
        test('should return true if exists', async () => {
          const responseEntity = {key: '1'}

          await expectSaga(helpers.entityExists, 'User', '1')
            .provide([[matchers.call.fn(requestSaga), {body: responseEntity}]])
            .returns(true)
            .run()
        })

        test('should return false if not', async () => {
          await expectSaga(helpers.entityExists, 'User', '1')
            .provide([[matchers.call.fn(requestSaga), throwError('404')]])
            .returns(false)
            .run()
        })
      })

      describe('fetchEntities', () => {
        test('should call fetch', () => {
          const query = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }

          const responseEntities = [{}, {}]

          return expectSaga(helpers.fetchEntities, 'User', query)
            .provide([[matchers.call.fn(requestSaga), {body: {data: responseEntities}}]])
            .returns(responseEntities)
            .run()
        })

        test('should set _allKeys param if requested', () => {
          const query = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }

          return expectSaga(helpers.fetchEntities, 'User', query, {allKeys: true})
            .provide([[matchers.call.fn(requestSaga), {body: {data: []}}]])
            .call(requestSaga, 'entities/2.0/User/search', {
              method: 'POST',
              queryParams: {
                _omitLinks: true,
                _allKeys: true
              },
              body: {
                paths: ['firstname', 'lastname']
              }
            })
            .run()
        })
      })

      describe('fetchDisplay', () => {
        test('should call fetch', () => {
          const response = {
            data: [
              {
                model: 'User',
                values: [
                  {
                    key: '1',
                    display: 'Test'
                  }
                ]
              }
            ]
          }

          return expectSaga(helpers.fetchDisplay, 'User', '1')
            .provide([[matchers.call.fn(requestSaga), {body: response}]])
            .returns('Test')
            .run()
        })

        test('should serve display from cache if already loaded', () => {
          helpers.addDisplayToCache('User.1', 'Test')

          return expectSaga(helpers.fetchDisplay, 'User', '1').returns('Test').run()
        })

        test('should serve display with type from cache if already loaded', () => {
          helpers.addDisplayToCache('User.1.tooltip', 'Test')

          return expectSaga(helpers.fetchDisplay, 'User', '1', 'tooltip').returns('Test').run()
        })
      })

      describe('invalidateDisplay', () => {
        test('should clear cache for display', () => {
          helpers.addDisplayToCache('User.1', 'Test')

          helpers.invalidateDisplay('User', '1')

          expect(helpers.getDisplayFromCache('User.1')).to.be.undefined
        })

        test('should clear cache for display even if it did not exist', () => {
          helpers.invalidateDisplay('User', '1')

          expect(helpers.getDisplayFromCache('User.1')).to.be.undefined
        })

        test('should clear cache for specific display type', () => {
          helpers.addDisplayToCache('User.1.test', 'Test')

          helpers.invalidateDisplay('User', '1', 'test')

          expect(helpers.getDisplayFromCache('User.1.test')).to.be.undefined
        })
      })

      describe('fetchDisplayExpressions', () => {
        test('should call requestSaga and transform response', () => {
          const formName = 'User'
          const scope = 'list'
          const entityKeys = ['1', '33']
          const fields = ['display1', 'display2']

          const responseFake = {
            formName,
            displayExpressions: [
              {
                key: '1',
                displayExpressions: {
                  display1: '<span>1-1</span>',
                  display2: '<span>1-2</span>'
                }
              },
              {
                key: '33',
                displayExpressions: {
                  display1: '<span>33-1</span>',
                  display2: '<span>33-2</span>'
                }
              }
            ]
          }

          const expectedResult = {
            1: {
              display1: '<span>1-1</span>',
              display2: '<span>1-2</span>'
            },
            33: {
              display1: '<span>33-1</span>',
              display2: '<span>33-2</span>'
            }
          }

          const entityName = 'User'

          return expectSaga(helpers.fetchDisplayExpressions, formName, scope, entityKeys, fields, entityName)
            .provide([[matchers.call.fn(requestSaga), {body: responseFake}]])
            .returns(expectedResult)
            .run()
        })
      })

      describe('fetchDisplays', () => {
        test('should transform input and response to objects', () => {
          const request = {
            User_status: ['2293'],
            Gender: ['1', '2']
          }

          const expectedOptions = {
            method: 'POST',
            body: {
              data: [
                {
                  model: 'User_status',
                  keys: ['2293']
                },
                {
                  model: 'Gender',
                  keys: ['1', '2']
                }
              ]
            },
            queryParams: {
              _ignoreFallback: false
            }
          }

          const responseFake = {
            body: {
              data: [
                {
                  model: 'User_status',
                  values: [
                    {
                      key: '2293',
                      display: 'Hans Muster 123'
                    }
                  ]
                },
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
          }

          const expectedResult = {
            User_status: {
              2293: 'Hans Muster 123'
            },
            Gender: {
              1: 'Male',
              2: 'Female'
            }
          }

          return expectSaga(helpers.fetchDisplays, request)
            .provide([[matchers.call.fn(requestSaga), responseFake]])
            .call(requestSaga, 'entities/2.0/displays', expectedOptions)
            .returns(expectedResult)
            .run()
        })

        test('should add _ignoreFallback query param', () => {
          const request = {
            User_status: ['2293'],
            Gender: ['1', '2']
          }

          const expectedOptions = {
            method: 'POST',
            body: {
              data: [
                {
                  model: 'User_status',
                  keys: ['2293']
                },
                {
                  model: 'Gender',
                  keys: ['1', '2']
                }
              ]
            },
            queryParams: {
              _ignoreFallback: true
            }
          }

          const responseFake = {
            body: {
              data: [
                {
                  model: 'User_status',
                  values: [
                    {
                      key: '2293',
                      display: 'Hans Muster 123'
                    }
                  ]
                },
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
          }

          return expectSaga(helpers.fetchDisplays, request, 'type', true)
            .provide([[matchers.call.fn(requestSaga), responseFake]])
            .call(requestSaga, 'entities/2.0/displays/type', expectedOptions)
            .run()
        })

        test('should only load uncached displays and combine results', () => {
          helpers.addDisplayToCache('Gender.1', 'Male')

          const request = {
            Gender: ['1', '2']
          }

          const expectedOptions = {
            method: 'POST',
            body: {
              data: [
                {
                  model: 'Gender',
                  keys: ['2']
                }
              ]
            },
            queryParams: {
              _ignoreFallback: false
            }
          }

          const responseFake = {
            body: {
              data: [
                {
                  model: 'Gender',
                  values: [
                    {
                      key: '2',
                      display: 'Female'
                    }
                  ]
                }
              ]
            }
          }

          const expectedResult = {
            Gender: {
              1: 'Male',
              2: 'Female'
            }
          }

          return expectSaga(helpers.fetchDisplays, request)
            .provide([[matchers.call.fn(requestSaga), responseFake]])
            .call(requestSaga, 'entities/2.0/displays', expectedOptions)
            .returns(expectedResult)
            .run()
        })

        test('should not request anything if all displays are cached', () => {
          helpers.addDisplayToCache('Gender.1', 'Male')
          helpers.addDisplayToCache('Gender.2', 'Female')

          const request = {
            Gender: ['1', '2']
          }

          const expectedResult = {
            Gender: {
              1: 'Male',
              2: 'Female'
            }
          }

          return expectSaga(helpers.fetchDisplays, request).returns(expectedResult).run()
        })
      })

      describe('invalidateDisplays', () => {
        test('should clear cache for displays', () => {
          helpers.addDisplayToCache('User.1', 'Test')
          helpers.addDisplayToCache('User.2', 'Test')

          helpers.invalidateDisplays({User: ['1', '2']})

          expect(helpers.getDisplayFromCache('User.1')).to.be.undefined
          expect(helpers.getDisplayFromCache('User.2')).to.be.undefined
        })

        test('should clear cache for multiple models', () => {
          helpers.addDisplayToCache('User.1', 'Test')
          helpers.addDisplayToCache('Address.2', 'Test')

          helpers.invalidateDisplays({User: ['1'], Address: ['2']})

          expect(helpers.getDisplayFromCache('User.1')).to.be.undefined
          expect(helpers.getDisplayFromCache('Address.2')).to.be.undefined
        })

        test('should clear cache specific display type', () => {
          helpers.addDisplayToCache('User.1.test', 'Test')
          helpers.addDisplayToCache('Address.2.test', 'Test')

          helpers.invalidateDisplays({User: ['1'], Address: ['2']}, 'test')

          expect(helpers.getDisplayFromCache('User.1.test')).to.be.undefined
          expect(helpers.getDisplayFromCache('Address.2.test')).to.be.undefined
        })
      })

      describe('fetchEntityCount', () => {
        test('should call fetch', () => {
          const query = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }

          const responseCount = {count: 1}

          return expectSaga(helpers.fetchEntityCount, 'User', query)
            .provide([[matchers.call.fn(requestSaga), {body: responseCount}]])
            .returns(responseCount.count)
            .run()
        })
      })

      describe('fetchForm', () => {
        const formName = 'User'
        const mode = 'update'
        const resp = {body: {form: {}}}
        const transformedResponse = {}

        test('should call fetch and use default transformer', () => {
          const gen = helpers.fetchForm(formName, mode)
          expect(gen.next().value).to.eql(call(requestSaga, `forms/${formName}/${mode}`, {}))

          expect(gen.next(resp).value).to.eql(call(helpers.defaultFormTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        test('should cache the form after first fetch', async () => {
          const formMock = {form: {}}

          const result = await expectSaga(helpers.fetchForm, 'User', 'update')
            .provide([[matchers.call.fn(requestSaga), {body: formMock}]])
            .call.like({fn: requestSaga})
            .run()

          return expectSaga(helpers.fetchForm, 'User', 'update')
            .returns(result.returnValue)
            .not.call.like({fn: requestSaga})
            .run()
        })

        test('should return null on allowed 404', async () => {
          return expectSaga(helpers.fetchForm, 'User', 'search', true)
            .provide([[matchers.call.fn(requestSaga), {status: 404}]])
            .returns(null)
            .run()
        })

        test('force reload of cached form', async () => {
          const formMock = {form: {}}

          const result = await expectSaga(helpers.fetchForm, 'User', 'update')
            .provide([[matchers.call.fn(requestSaga), {body: formMock}]])
            .call.like({fn: requestSaga})
            .run()

          return expectSaga(helpers.fetchForm, 'User', 'update', false, true)
            .provide([[matchers.call.fn(requestSaga), {body: formMock}]])
            .returns(result.returnValue)
            .call.like({fn: requestSaga})
            .run()
        })

        test('should fetch create form with default values', () => {
          const gen = helpers.fetchForm('Address', 'create')
          expect(gen.next().value).to.eql(
            call(requestSaga, 'forms/Address/create', {
              queryParams: {_display: true}
            })
          )
        })

        test('should fetch search form with default values', () => {
          const gen = helpers.fetchForm('Address', 'search')
          expect(gen.next().value).to.eql(
            call(requestSaga, 'forms/Address/search', {
              queryParams: {_display: true}
            })
          )
        })

        test('should fetch update form without default values', () => {
          const gen = helpers.fetchForm('Address', 'update')
          expect(gen.next().value).to.eql(call(requestSaga, 'forms/Address/update', {}))
        })

        describe('defaulFormTransformer', () => {
          test('should return form propery', () => {
            const inputForm = {form: {children: []}}
            const expectedForm = {children: []}
            expect(helpers.defaultFormTransformer(inputForm)).to.eql(expectedForm)
          })
        })
      })

      describe('fetchSearchFilters', () => {
        const entity = 'User'
        const resp = {body: {filters: [{uniqueId: 'activeUser'}]}}

        test('should call request saga and return filters property ', () => {
          return expectSaga(helpers.fetchSearchFilters, entity)
            .provide([[matchers.call.fn(requestSaga), resp]])
            .returns(resp.body.filters)
            .run()
        })
      })

      describe('fetchModel', () => {
        const entity = 'User'
        const resp = {body: {}}
        const transformedResponse = {}

        test('should call fetch and use default transformer', () => {
          const gen = helpers.fetchModel(entity)
          expect(gen.next().value).to.eql(call(requestSaga, `entities/${entity}/model`))

          expect(gen.next(resp).value).to.eql(call(helpers.defaultModelTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        test('should cache the model after first fetch', async () => {
          const mockModel = {
            name: 'User',
            label: 'Person',
            markable: true,
            useNiceFields: true,
            keyField: 'pk',
            fields: [
              {
                fieldName: 'pk',
                type: 'serial',
                validation: {}
              }
            ],
            relations: []
          }

          const result = await expectSaga(helpers.fetchModel, 'User')
            .provide([[matchers.call.fn(requestSaga), {body: mockModel}]])
            .call.like({fn: requestSaga})
            .run()

          return expectSaga(helpers.fetchModel, 'User')
            .returns(result.returnValue)
            .not.call.like({fn: requestSaga})
            .run()
        })

        describe('defaultModelTransformer', () => {
          test('should return flatten object ', () => {
            const inputModel = {
              label: 'Test',
              name: 'test',
              markable: true,
              useNiceFields: true,
              keyField: 'pk',
              fields: [
                {
                  fieldName: 'pk',
                  type: 'serial',
                  validation: {}
                },
                {
                  fieldName: 'active',
                  type: 'boolean',
                  validation: {
                    mandatory: false
                  }
                }
              ],
              relations: [
                {
                  relationName: 'relUser',
                  targetEntity: 'User',
                  reverseRelationName: 'relDummySubGrid',
                  multi: false
                }
              ]
            }

            const expectedModel = {
              label: 'Test',
              name: 'test',
              markable: true,
              useNiceFields: true,
              keyField: 'pk',
              paths: {
                active: {
                  fieldName: 'active',
                  type: 'boolean',
                  validation: {
                    mandatory: false
                  }
                },
                pk: {
                  fieldName: 'pk',
                  type: 'serial',
                  validation: {}
                },
                relUser: {
                  multi: false,
                  relationName: 'relUser',
                  reverseRelationName: 'relDummySubGrid',
                  targetEntity: 'User',
                  type: 'relation'
                }
              }
            }

            const result = helpers.defaultModelTransformer(inputModel)
            expect(result).to.eql(expectedModel)
          })
        })

        describe('flattenObjectValues', () => {
          test('should extract value attributes of object values', () => {
            const values = {
              'relUser.pk': {value: '1', display: 'Tocco'},
              firstname: 'Test'
            }

            const expectedResult = {
              'relUser.pk': '1',
              firstname: 'Test'
            }

            const result = helpers.flattenObjectValues(values)
            expect(result).to.eql(expectedResult)
          })
        })

        describe('fetchPrincipal', () => {
          test('should call requestSaga and return the principals info object', () => {
            const response = {
              username: 'tocco',
              businessUnit: 'test1'
            }

            const expectedReturn = {
              username: 'tocco',
              currentBusinessUnit: 'test1'
            }

            return expectSaga(helpers.fetchPrincipal)
              .provide([[matchers.call.fn(requestSaga), {body: response}]])
              .returns(expectedReturn)
              .run()
          })

          test('should load cached principal info object after fetch', async () => {
            const expectedReturn = {
              username: 'tocco',
              currentBusinessUnit: 'test1'
            }

            cache.addLongTerm('session', 'principal', expectedReturn)

            return expectSaga(helpers.fetchPrincipal).returns(expectedReturn).run()
          })
        })
      })

      describe('createSortingString', () => {
        test('handles empty list', () => {
          const results = helpers.createSortingString([])
          expect(results).to.be.empty
        })

        test('handles sorting fields', () => {
          const results = helpers.createSortingString([
            {
              field: 'first',
              order: 'asc'
            },
            {
              field: 'second',
              order: 'desc'
            }
          ])
          expect(results).to.equal('first asc, second desc')
        })
      })

      describe('fetchMarkings', () => {
        test('should request markings for selection', () => {
          const selection = {
            entityName: 'User',
            type: 'ID',
            ids: ['23', '644']
          }

          const options = {
            method: 'POST',
            body: {
              selection
            }
          }

          const markings = {23: false, 644: true}

          return expectSaga(helpers.fetchMarkings, selection)
            .provide([[call(requestSaga, 'client/markings', options), {body: {markings}}]])
            .returns(markings)
            .run()
        })
      })

      describe('fetchMarked', () => {
        test('should request marking for single entity', () => {
          const options = {
            method: 'GET'
          }

          return expectSaga(helpers.fetchMarked, 'User', '672')
            .provide([[call(requestSaga, 'client/markings/User/672', options), {body: {marked: true}}]])
            .returns(true)
            .run()
        })
      })

      describe('setMarked', () => {
        test('should set marking for single entity', () => {
          const options = {
            method: 'PATCH',
            body: {
              marked: true
            }
          }

          return expectSaga(helpers.setMarked, 'User', '672', true)
            .provide([[call(requestSaga, 'client/markings/User/672', options)]])
            .call(requestSaga, 'client/markings/User/672', options)
            .run()
        })
      })

      describe('setSelectionMarked', () => {
        test('should set marking for selection', () => {
          const selection = {
            entityName: 'User',
            type: 'ID',
            ids: ['23', '644']
          }

          const options = {
            method: 'POST',
            body: {
              selection,
              marked: true
            }
          }

          const markings = {
            23: true,
            644: true
          }

          return expectSaga(helpers.setSelectionMarked, selection, true)
            .provide([[call(requestSaga, 'client/markings', options), {body: {markings}}]])
            .returns(markings)
            .run()
        })
      })
    })
  })
})
