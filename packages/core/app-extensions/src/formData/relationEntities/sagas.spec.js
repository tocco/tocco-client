import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeEvery} from 'redux-saga/effects'

import form from '../../form'
import rest from '../../rest'
import * as relationEntitiesActions from './actions'
import * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('relationEntities', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([takeEvery(relationEntitiesActions.LOAD_RELATION_ENTITIES, sagas.loadRelationEntity)])
          })
        })

        describe('loadRelationEntity saga', () => {
          test('should load relation entities, dispatch loading and entities', () => {
            const fieldData = undefined
            const fieldName = 'relUser'
            const entities = [{display: 'User1', key: 1}]

            return expectSaga(sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User'))
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .put(relationEntitiesActions.setRelationEntityLoading(fieldName))
              .put(relationEntitiesActions.setRelationEntities(fieldName, entities, false, undefined))
              .run()
          })

          test('should not load entities if allready loaded', () => {
            const fieldData = {data: [{key: '1', display: 'one'}]}
            const fieldName = 'relUser'

            return expectSaga(sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User'))
              .provide([[select(sagas.fieldDataSelector, fieldName), fieldData]])
              .not.put.like({action: {type: relationEntitiesActions.SET_RELATION_ENTITIES_LOADING}})
              .not.put.like({action: {type: relationEntitiesActions.SET_RELATION_ENTITIES}})
              .run()
          })

          test('should reload with forceReload option', () => {
            const fieldData = {data: [{key: '1', display: 'one'}]}
            const fieldName = 'relUser'
            const entities = [{display: 'User1', key: 1}]
            const forceReload = true

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User', {forceReload})
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .put(relationEntitiesActions.setRelationEntityLoading(fieldName))
              .put(relationEntitiesActions.setRelationEntities(fieldName, entities, false, undefined))
              .run()
          })

          test('should set moreEntities available', () => {
            const fieldData = undefined
            const fieldName = 'relUser'
            const entities = [
              {display: 'User1', key: 1},
              {display: 'User2', key: 2}
            ]
            const options = {limit: 1}

            const moreEntitiesAvailable = true
            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User', options)
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .put(relationEntitiesActions.setRelationEntityLoading(fieldName))
              .put(
                relationEntitiesActions.setRelationEntities(fieldName, [entities[0]], moreEntitiesAvailable, undefined)
              )
              .run()
          })

          test('should reload use option object to build query params', () => {
            const fieldData = {}
            const fieldName = 'relUser'
            const entities = [{display: 'User1', key: 1}]
            const options = {limit: 5, searchTerm: 'Tes', sorting: [{name: 'update_timestamp', direction: 'desc'}]}

            const expectedFetchParams = {
              limit: options.limit + 1,
              sorting: options.sorting,
              search: options.searchTerm
            }

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User', options)
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .call.like({
                fn: rest.fetchEntities,
                args: ['User', expectedFetchParams]
              })
              .run()
          })

          test('should load only active entities', () => {
            const fieldData = undefined
            const fieldName = 'relUser_status'
            const entities = [{display: 'Status', key: 1}]

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User_status')
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {active: {type: 'boolean'}}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .call.like({
                fn: rest.fetchEntities,
                args: ['User_status', {where: 'active'}]
              })
              .run()
          })

          test('should load only active entities with pk < 100', () => {
            const fieldData = undefined
            const fieldName = 'relUser_status'
            const entities = [{display: 'Status', key: 1}]
            const options = {where: 'pk < 100'}

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User_status', options)
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {active: {type: 'boolean'}}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .call.like({
                fn: rest.fetchEntities,
                args: ['User_status', {where: 'pk < 100 and active'}]
              })
              .run()
          })

          test('should clear existing entites when searchTerm changed', () => {
            const fieldData = {data: [{key: '1', display: 'one'}], searchTerm: 'one'}
            const fieldName = 'relUser'
            const entities = [{display: 'two', key: 1}]
            const options = {searchTerm: 'two', forceReload: true}

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User', options)
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {active: {type: 'boolean'}}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .put(relationEntitiesActions.setRelationEntityLoading(fieldName, true))
              .put(relationEntitiesActions.setRelationEntities(fieldName, entities, false, 'two'))
              .run()
          })

          test("should not clear existing entites when searchTerm hasn't changed", () => {
            const fieldData = {data: [{key: '1', display: 'one'}], searchTerm: 'one'}
            const fieldName = 'relUser'
            const entities = [
              {display: 'one', key: 1},
              {display: 'two', key: 2}
            ]
            const options = {searchTerm: 'one', forceReload: true}

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities(fieldName, 'User', options)
            )
              .provide([
                [select(sagas.fieldDataSelector, fieldName), fieldData],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(rest.fetchModel), {paths: {active: {type: 'boolean'}}}],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .put(relationEntitiesActions.setRelationEntityLoading(fieldName, false))
              .put(relationEntitiesActions.setRelationEntities(fieldName, entities, false, 'one'))
              .run()
          })

          test('should load remotefield form configs when requested', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true}
            const finalOptions = {constriction: 'const', sorting: 'sort'}

            return expectSaga(
              sagas.loadRelationEntity,
              relationEntitiesActions.loadRelationEntities('relUser', 'User', initialOptions)
            )
              .provide([
                [select(sagas.fieldDataSelector, 'relUser'), undefined],
                [matchers.call.fn(rest.fetchEntities), []],
                [matchers.call.fn(rest.fetchModel), {paths: {}}],
                [matchers.call.fn(sagas.finalizeOptions), finalOptions]
              ])
              .call.like({
                fn: sagas.finalizeOptions,
                args: ['User', initialOptions]
              })
              .call.like({
                fn: sagas.getQuery,
                args: [finalOptions]
              })
              .run()
          })
        })

        describe('getQuery', () => {
          test('should return query object with limit one higher than input', () => {
            const options = {
              limit: 22,
              searchTerm: 'test',
              sorting: [{field: 'firstname', order: 'adsc'}]
            }
            const result = sagas.getQuery(options)
            const expectedResult = {
              limit: 23,
              search: 'test',
              sorting: [{field: 'firstname', order: 'adsc'}]
            }

            expect(result).to.eql(expectedResult)
          })

          test('should return empty object for undefined property', () => {
            const result = sagas.getQuery({where: undefined})
            expect(result).to.eql({})
          })

          test('should return empty object for null property', () => {
            const result = sagas.getQuery({where: null})
            expect(result).to.eql({})
          })

          test('should return empty object for empty input', () => {
            const result = sagas.getQuery({})
            expect(result).to.eql({})
          })
        })

        describe('enhanceEntitiesWithDisplays', () => {
          test('should ', () => {
            const entities = [
              {key: '1', model: 'Gender'},
              {key: '22', model: 'Local'},
              {key: '2', model: 'Gender'}
            ]

            const displays = {
              Gender: {
                1: 'Male',
                2: 'Female'
              },
              Local: {
                22: 'German'
              }
            }

            const expectedReturnValue = [
              {display: 'Male', key: '1', model: 'Gender'},
              {display: 'German', key: '22', model: 'Local'},
              {display: 'Female', key: '2', model: 'Gender'}
            ]

            return expectSaga(sagas.enhanceEntitiesWithDisplays, entities)
              .provide([[matchers.call.fn(rest.fetchDisplays), displays, 'remote']])
              .run()
              .then(result => {
                expect(result.returnValue).to.eql(expectedReturnValue)
              })
          })
        })

        describe('finalizeOptions', () => {
          const formDefinition = {
            children: [
              {
                componentType: form.componentTypes.TABLE,
                constriction: 'const',
                sorting: 'sort'
              }
            ]
          }

          test('should load default form', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .provide([[matchers.call.fn(rest.fetchForm), formDefinition]])
              .call.like({
                fn: rest.fetchForm,
                args: ['User', 'remotefield']
              })
              .run()
              .then(result => {
                expect(result.returnValue).to.eql({
                  constriction: 'const',
                  sorting: 'sort',
                  loadRemoteFieldConfiguration: true
                })
              })
          })

          test('should not overwrite passed constriction', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true, constriction: 'passed'}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .provide([[matchers.call.fn(rest.fetchForm), formDefinition]])
              .call.like({
                fn: rest.fetchForm,
                args: ['User', 'remotefield']
              })
              .run()
              .then(result => {
                expect(result.returnValue).to.eql({
                  constriction: 'passed',
                  sorting: 'sort',
                  loadRemoteFieldConfiguration: true
                })
              })
          })

          test('should not overwrite passed sorting', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true, sorting: 'passed'}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .provide([[matchers.call.fn(rest.fetchForm), formDefinition]])
              .call.like({
                fn: rest.fetchForm,
                args: ['User', 'remotefield']
              })
              .run()
              .then(result => {
                expect(result.returnValue).to.eql({
                  constriction: 'const',
                  sorting: 'passed',
                  loadRemoteFieldConfiguration: true
                })
              })
          })

          test('should use update_timestamp as fallback sorting', () => {
            const formDefinitionWithoutSorting = {
              children: [
                {
                  componentType: form.componentTypes.TABLE,
                  constriction: 'const'
                }
              ]
            }
            const initialOptions = {loadRemoteFieldConfiguration: true}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .provide([[matchers.call.fn(rest.fetchForm), formDefinitionWithoutSorting]])
              .call.like({
                fn: rest.fetchForm,
                args: ['User', 'remotefield']
              })
              .run()
              .then(result => {
                expect(result.returnValue).to.eql({
                  constriction: 'const',
                  sorting: [{field: 'update_timestamp', order: 'desc'}],
                  loadRemoteFieldConfiguration: true
                })
              })
          })

          test('should not load form when nothing needs to be loaded', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true, sorting: 'passed', constriction: 'passed'}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .not.call.like({
                fn: rest.fetchForm
              })
              .run()
              .then(result => {
                expect(result.returnValue).to.eql(initialOptions)
              })
          })

          test('should load passed form name', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true, formBase: 'FormBase'}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .provide([[matchers.call.fn(rest.fetchForm), formDefinition]])
              .call.like({
                fn: rest.fetchForm,
                args: ['FormBase', 'remotefield']
              })
              .run()
          })

          test('should load passed form name', () => {
            const initialOptions = {loadRemoteFieldConfiguration: true, formName: 'custom'}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .provide([[matchers.call.fn(rest.fetchForm), formDefinition]])
              .call.like({
                fn: rest.fetchForm,
                args: ['User_custom', 'remotefield']
              })
              .run()
          })

          test('should return options when not asked to load remote field config', () => {
            const initialOptions = {}
            return expectSaga(sagas.finalizeOptions, 'User', initialOptions)
              .run()
              .then(result => {
                expect(result.returnValue).to.eql(initialOptions)
              })
          })
        })
      })
    })
  })
})
