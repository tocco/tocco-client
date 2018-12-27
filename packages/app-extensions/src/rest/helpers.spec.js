
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {requestSaga} from './rest'
import * as helpers from './helpers'

import {call} from 'redux-saga/effects'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('helpers', () => {
      describe('buildEntityQueryObject', () => {
        test('should return an empty object with no options', () => {
          expect(helpers.buildEntityQueryObject()).to.eql({})
        })

        test('should return object with valid params', () => {
          const options = {
            paths: ['f1', 'f2'],
            conditions: {_search: 'test'},
            filters: ['filter1', 'filter2']
          }

          const params = helpers.buildEntityQueryObject(options)

          const expectedParams = {
            paths: ['f1', 'f2'],
            conditions: {_search: 'test'},
            filter: ['filter1', 'filter2']
          }

          expect(params).to.eql(expectedParams)
        })

        test('should set exclamation mark for fields and relations if explicitly empty', () => {
          const options = {
            fields: [],
            relations: []
          }

          const params = helpers.buildEntityQueryObject(options)

          expect(params).to.eql({
            fields: '!',
            relations: '!'
          })
        })

        test('should set sort if sorting is valid', () => {
          const options = {
            sorting: [{field: 'firstname', order: 'desc'}]
          }

          const params = helpers.buildEntityQueryObject(options)

          expect(params).to.eql({
            sort: 'firstname desc'
          })
        })

        test('should not sort if oderBy is not valid', () => {
          const options = {
            orderBy: [{id: 'firstname'}]
          }

          const params = helpers.buildEntityQueryObject(options)
          expect(params).to.eql({})
        })

        test('should set limit and offset accordingly', () => {
          const options = {
            limit: 20,
            page: 3
          }

          const params = helpers.buildEntityQueryObject(options)
          expect(params).to.eql({
            limit: 20,
            offset: 40
          })
        })
      })

      describe('queryObjectToUrlParams', () => {
        test('should prepend lodash to attribute name and join arrays\'', () => {
          const input = {
            limit: 20,
            offset: 40,
            paths: ['firstname', 'lastname']
          }

          const expectedResult = {
            _limit: 20,
            _offset: 40,
            _paths: 'firstname,lastname'

          }
          expect(helpers.queryObjectToUrlParams(input)).to.eql(expectedResult)
        })

        test('should attach conditions to object and let them be arrays', () => {
          const input = {
            limit: 10,
            conditions: {
              _search: 'asd',
              firstname: ['dake', 'rott']
            }
          }

          const expectedResult = {
            _limit: 10,
            _search: 'asd',
            firstname: ['dake', 'rott']
          }
          expect(helpers.queryObjectToUrlParams(input)).to.eql(expectedResult)
        })
      })

      describe('fetchEntity', () => {
        test('should call fetch', async() => {
          const params = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }
          const reponseEntity = {paths: {fistname: 'Jack'}}

          await expectSaga(helpers.fetchEntity, 'User', '1', {...params})
            .provide([
              [matchers.call.fn(requestSaga), {body: reponseEntity}]
            ])
            .returns(reponseEntity)
            .run()
        })
      })

      describe('fetchEntities', () => {
        test('should call fetch', () => {
          const options = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }

          const responseEntities = [{}, {}]

          return expectSaga(helpers.fetchEntities, 'User', options)
            .provide([
              [matchers.call.fn(requestSaga), {body: {data: responseEntities}}]
            ])
            .returns(responseEntities)
            .run()
        })
      })

      describe('fetchEntityCount', () => {
        test('should call fetch', () => {
          const options = {
            paths: ['firstname', 'lastname'],
            forms: 'User_detail'
          }

          const responseCount = {count: 1}

          return expectSaga(helpers.fetchEntityCount, 'User', options)
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
          expect(gen.next().value).to.eql(call(requestSaga, `forms/${formName}`))

          expect(gen.next(resp).value).to.eql(call(helpers.defaultFormTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        test('should call fetch and use provided transformer', () => {
          const myTransformer = () => {}
          const gen = helpers.fetchForm(formName, myTransformer)
          expect(gen.next().value).to.eql(call(requestSaga, `forms/${formName}`))

          expect(gen.next(resp).value).to.eql(call(myTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        test('should call fetch and use provided transformer', () => {
          const myTransformer = () => {}
          const gen = helpers.fetchForm(formName, myTransformer)
          expect(gen.next().value).to.eql(call(requestSaga, `forms/${formName}`))

          expect(gen.next(resp).value).to.eql(call(myTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        describe('defaulFormTransformer', () => {
          test('should return form propery', () => {
            const inputForm = {form: {children: []}}
            const expectedForm = {children: []}
            expect(helpers.defaultFormTransformer(inputForm)).to.eql(expectedForm)
          })
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

        test('should call fetch and use provided transformer', () => {
          const myTransformer = () => {}
          const gen = helpers.fetchModel(entity, myTransformer)
          expect(gen.next().value).to.eql(call(requestSaga, `entities/${entity}/model`))

          expect(gen.next(resp).value).to.eql(call(myTransformer, resp.body))

          const next = gen.next(transformedResponse)
          expect(next.value).to.equal(transformedResponse)
          expect(next.done).to.be.true
        })

        describe('defaultModelTransformer', () => {
          test('should return flatten object ', () => {
            const inputModel = {
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

            const result = helpers.defaultModelTransformer(inputModel)
            expect(result).to.eql(expectedModel)
          })
        })
      })
    })
  })
})
