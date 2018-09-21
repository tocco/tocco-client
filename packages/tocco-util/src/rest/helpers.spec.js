import * as helpers from './helpers'
import {requestSaga} from './rest'

import {call} from 'redux-saga/effects'

describe('toccoutil', () => {
  describe('rest', () => {
    describe('helpers', () => {
      describe('fetchEntites', () => {
        describe('buildParams', () => {
          test('should call fetch return object of valid params', () => {
            const options = {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              paths: ['f1', 'f2'],
              searchInputs: {_search: 'test'}
            }

            const params = helpers.buildParams(options)

            const expectedParams = {
              _fields: null,
              _filter: '',
              _form: undefined,
              _limit: 20,
              _offset: 20,
              _paths: 'f1,f2',
              _relations: null,
              _search: 'test',
              _sort: undefined,
              _where: undefined
            }

            expect(params).to.eql(expectedParams)
          })

          test(
            'should set exclamation mark for fields and relations if explicitly empty',
            () => {
              const options = {
                page: 2,
                orderBy: 'firstname',
                limit: 20,
                fields: [],
                relations: [],
                searchInputs: {_search: 'test'}
              }

              const params = helpers.buildParams(options)

              const expectedParams = {
                _fields: '!',
                _filter: '',
                _form: undefined,
                _limit: 20,
                _offset: 20,
                _paths: '',
                _relations: '!',
                _search: 'test',
                _sort: undefined,
                _where: undefined
              }

              expect(params).to.eql(expectedParams)
            }
          )
        })

        describe('fetchEntities', () => {
          test('should call fetch', () => {
            const params = {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              paths: ['f1', 'f2'],
              searchInputs: {_search: 'test'}
            }

            const queryParams = {
              _fields: null,
              _filter: '',
              _form: undefined,
              _limit: 20,
              _offset: 20,
              _paths: 'f1,f2',
              _relations: null,
              _search: 'test',
              _sort: undefined
            }

            const gen = helpers.fetchEntities('User', params)
            expect(gen.next().value).to.eql(call(helpers.buildParams, params))
            expect(gen.next(queryParams).value).to.eql(call(requestSaga, 'entities/User', {queryParams}))

            const resp = {
              body: {}
            }

            expect(gen.next(resp).value).to.eql(call(helpers.defaultEntityTransformer, resp.body))

            const transformedResponse = {}

            const next = gen.next(transformedResponse)

            expect(next.value).to.equal(transformedResponse) // expect same (not just equal)
            expect(next.done).to.be.true
          })
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
