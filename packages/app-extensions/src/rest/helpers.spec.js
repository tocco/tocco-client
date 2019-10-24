
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call} from 'redux-saga/effects'
import {cache} from 'tocco-util'

import {requestSaga} from './rest'
import * as helpers from './helpers'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('helpers', () => {
      beforeEach(() => {
        cache.clear()
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
        test('should call fetch', async() => {
          const query = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }
          const responseEntity = {paths: {firstname: 'Jack'}}

          await expectSaga(helpers.fetchEntity, 'User', '1', query)
            .provide([
              [matchers.call.fn(requestSaga), {body: responseEntity}]
            ])
            .returns(responseEntity)
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
            .provide([
              [matchers.call.fn(requestSaga), {body: {data: responseEntities}}]
            ])
            .returns(responseEntities)
            .run()
        })
      })

      describe('fetchDisplay', () => {
        test('should call fetch', () => {
          const response = {display: 'Test'}

          return expectSaga(helpers.fetchDisplay, 'User', 1)
            .provide([
              [matchers.call.fn(requestSaga), {body: response}]
            ])
            .returns('Test')
            .run()
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
            .provide([
              [matchers.call.fn(requestSaga), {body: responseCount}]
            ])
            .returns(responseCount.count)
            .run()
        })
      })

      describe('fetchForm', () => {
        const formName = 'User_detail'
        const resp = {body: {form: {}}}
        const transformedResponse = {}

        test('should call fetch and use default transformer', () => {
          const gen = helpers.fetchForm(formName)
          expect(gen.next().value).to.eql(call(requestSaga, `forms/${formName}`, {}))

          expect(gen.next(resp).value).to.eql(call(helpers.defaultFormTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        test('should cache the form after first fetch', async() => {
          const formMock = {form: {}}

          const result = await expectSaga(helpers.fetchForm, 'User_detail')
            .provide([
              [matchers.call.fn(requestSaga), {body: formMock}]
            ])
            .call.like({fn: requestSaga})
            .run()

          return expectSaga(helpers.fetchForm, 'User_detail')
            .returns(result.returnValue)
            .not.call.like({fn: requestSaga})
            .run()
        })

        test('should return null on allowed 404', async() => {
          return expectSaga(helpers.fetchForm, 'User_detail', true)
            .provide([
              [matchers.call.fn(requestSaga), {status: 404}]
            ])
            .returns(null)
            .run()
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
            .provide([
              [matchers.call.fn(requestSaga), resp]
            ])
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

        test('should cache the model after first fetch', async() => {
          const mockModel = {
            name: 'User',
            label: 'Person',
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
            .provide([
              [matchers.call.fn(requestSaga), {body: mockModel}]
            ])
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
              'firstname': 'Test'
            }

            const expectedResult = {
              'relUser.pk': '1',
              'firstname': 'Test'
            }

            const result = helpers.flattenObjectValues(values)
            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
