import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, call, put, select, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {externalEvents, form, remoteEvents, reports, rest} from 'tocco-app-extensions'
import {api} from 'tocco-util'

import {entitiesListTransformer} from '../../util/api/entities'
import {getFields, getSorting} from '../../util/api/forms'
import * as searchFormActions from '../searchForm/actions'
import {getSearchFormValues} from '../searchForm/sagas'
import * as selectionActions from '../selection/actions'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const generateState = (entityStore, page, markable = true) => ({
  initialized: false,
  sorting: [],
  entityStore,
  formDefinition: {
    id: 'User_list',
    children: [
      {
        componentType: 'table',
        endpoint: '/fetch'
      }
    ]
  },
  page,
  entityModel: {
    markable
  }
})

describe('entity-list', () => {
  describe('modules', () => {
    describe('list', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeLatest(actions.INITIALIZE, sagas.initialize),
                takeLatest(actions.CHANGE_PAGE, sagas.changePage),
                takeLatest(searchFormActions.EXECUTE_SEARCH, sagas.reloadData),
                takeLatest(searchFormActions.EXECUTE_SEARCH, sagas.queryChanged),
                takeLatest(actions.SET_SORTING_INTERACTIVE, sagas.reloadData),
                takeLatest(actions.REFRESH, sagas.refreshData),
                takeLatest(actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate),
                takeLatest(actions.NAVIGATE_TO_ACTION, sagas.navigateToAction),
                takeLatest(selectionActions.RELOAD_DATA, sagas.reloadData),
                takeLatest(actions.ON_ROW_CLICK, sagas.onRowClick),
                takeEvery(remoteEvents.REMOTE_EVENT, sagas.remoteEvent),
                takeLatest(searchFormActions.SET_SEARCH_FILTER_ACTIVE, sagas.setSorting),
                takeLatest(actions.DEFINE_SORTING, sagas.setSorting),
                takeLatest(actions.SET_MARKED, sagas.setMarked),
                takeLatest(actions.TOGGLE_MARKINGS, sagas.toggleMarkings)
              ])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          test('should load form and model', () => {
            const formName = 'UserSearch'
            const entityName = 'User'
            const scope = 'list'
            return expectSaga(sagas.initialize)
              .provide([
                [select(sagas.inputSelector), {entityName, formName, scope}],
                [matchers.call.fn(sagas.loadFormDefinition)],
                [matchers.call.fn(sagas.loadEntityModel)]
              ])
              .call(sagas.loadFormDefinition, formName, scope, actions.setFormDefinition)
              .call(sagas.loadEntityModel, entityName)
              .put(actions.setInitialized())
              .run()
          })

          test('should also load search list form if requested', () => {
            const formName = 'User'
            const searchListFormName = 'UserSearch'
            const entityName = 'User'
            const scope = 'list'
            return expectSaga(sagas.initialize)
              .provide([
                [select(sagas.inputSelector), {entityName, formName, scope, searchListFormName}],
                [matchers.call.fn(sagas.loadFormDefinition)],
                [matchers.call.fn(sagas.loadEntityModel)]
              ])
              .call(sagas.loadFormDefinition, formName, scope, actions.setFormDefinition)
              .call(sagas.loadFormDefinition, searchListFormName, scope, actions.setSearchListFormDefinition)
              .call(sagas.loadEntityModel, entityName)
              .put(actions.setInitialized())
              .run()
          })
        })

        describe('changePage saga', () => {
          test('should set currentPage and requestEntities', () => {
            const page = 1
            const gen = sagas.changePage({payload: {page}})
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(put(actions.setCurrentPage(page)))
            expect(gen.next().value).to.eql(call(sagas.requestEntities, page))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('reloadData saga', () => {
          test('should load data with first page', () => {
            return expectSaga(sagas.reloadData)
              .provide([[matchers.call.fn(sagas.loadData)]])
              .put(actions.setCurrentPage(1))
              .call(sagas.loadData, 1)
              .run()
          })
        })

        describe('refresh saga', () => {
          test('should  load data with first page', () => {
            return expectSaga(sagas.refreshData)
              .provide([[select(sagas.listSelector), {currentPage: 3}], [matchers.call.fn(sagas.loadData)]])
              .call(sagas.loadData, 3)
              .run()
          })
        })

        describe('fetchEntitiesAndAddToStore saga', () => {
          test('should not add entities to store if already in it', () => {
            const entityName = 'User'
            const formName = 'User'
            const entityStore = {1: {}}

            const state = {
              entityList: {},
              input: {entityName, formName},
              preferences: {},
              list: {entityStore}
            }

            const gen = sagas.fetchEntitiesAndAddToStore(1)
            expect(gen.next().value).to.eql(select(sagas.stateSelector))
            expect(gen.next(state).done).to.be.true
          })

          test('should add entities to store', () => {
            const listViewState = generateState({}, 1)
            const entities = []
            const fields = ['firstname', 'lastname']

            const page = 1

            const state = {
              input: {formName: 'UserTest', entityName: 'User', scope: 'list'},
              list: listViewState,
              preferences: {columns: {}}
            }

            return expectSaga(sagas.fetchEntitiesAndAddToStore, page)
              .provide([
                [select(sagas.stateSelector), state],
                [select(sagas.inputSelector), state.input],
                [select(sagas.listSelector), state.list],
                [matchers.call.fn(getFields), fields],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(sagas.getBasicQuery), {}],
                [matchers.spawn.fn(sagas.loadRelationDisplays), {}],
                [matchers.spawn.fn(sagas.loadDisplayExpressions), {}]
              ])
              .spawn(sagas.loadMarkings, entities)
              .put(actions.addEntitiesToStore(page, entities))
              .run()
          })

          test('should use endpoint from search list form if set and if search mode', () => {
            const listViewState = generateState({}, 1)
            const entities = []
            const fields = ['firstname', 'lastname']

            const page = 1

            const state = {
              input: {formName: 'UserTest', entityName: 'User', scope: 'list', limit: ''},
              list: {
                ...listViewState,
                searchListFormDefinition: {
                  id: 'UserTestSearch_list',
                  children: [
                    {
                      componentType: 'table',
                      endpoint: '/search-fetch'
                    }
                  ]
                }
              },
              preferences: {columns: {}}
            }

            return expectSaga(sagas.fetchEntitiesAndAddToStore, page)
              .provide([
                [select(sagas.stateSelector), state],
                [select(sagas.inputSelector), state.input],
                [select(sagas.listSelector), state.list],
                [matchers.call.fn(getFields), fields],
                [matchers.call.fn(rest.fetchEntities), entities],
                [
                  matchers.call.fn(sagas.getBasicQuery),
                  {
                    hasUserChanges: true
                  }
                ],
                [matchers.spawn.fn(sagas.loadRelationDisplays), {}],
                [matchers.spawn.fn(sagas.loadDisplayExpressions), {}]
              ])
              .call(
                rest.fetchEntities,
                'User',
                {
                  hasUserChanges: true,
                  page: 1,
                  sorting: [],
                  limit: '',
                  paths: undefined
                },
                {method: 'GET', endpoint: '/search-fetch'},
                entitiesListTransformer
              )
              .spawn(sagas.loadMarkings, entities)
              .put(actions.addEntitiesToStore(page, entities))
              .run()
          })
        })

        describe('getSearchFilter saga', () => {
          test('should return a string with unique values separated by comma', () => {
            const inputFilers = ['filter1', 'filter2']
            const searchFilter = ['filter1', 'filter3']
            const expectedReturnValue = ['filter1', 'filter2', 'filter3']

            return expectSaga(sagas.getSearchFilter, inputFilers, searchFilter).returns(expectedReturnValue).run()
          })
        })

        describe('hasActiveSearchFilterOrderBy saga', () => {
          test('search filters not set', () => {
            return expectSaga(sagas.hasActiveSearchFilterOrderBy)
              .provide([[select(sagas.searchFormSelector), {searchFilters: null}]])
              .returns(null)
              .run()
          })

          test('no active search filter with order by', () => {
            const searchFilters = [
              {active: true, orderBy: ''},
              {active: false, orderBy: 'firstname'}
            ]
            return expectSaga(sagas.hasActiveSearchFilterOrderBy)
              .provide([[select(sagas.searchFormSelector), {searchFilters}]])
              .returns(false)
              .run()
          })

          test('active search filter with order by', () => {
            const searchFilters = [{active: true, orderBy: 'firstname'}]
            return expectSaga(sagas.hasActiveSearchFilterOrderBy)
              .provide([[select(sagas.searchFormSelector), {searchFilters}]])
              .returns(true)
              .run()
          })
        })

        describe('requestEntities saga', () => {
          test('should request entities', () => {
            const entityStore = {}
            const page = 1
            return expectSaga(sagas.requestEntities, page)
              .provide([
                [select(sagas.listSelector), {entityStore}],
                [matchers.call.fn(sagas.fetchEntitiesAndAddToStore)]
              ])
              .call.like({fn: sagas.fetchEntitiesAndAddToStore})
              .call(sagas.displayEntity, page)
              .spawn(sagas.delayedPreloadNextPage, page)
              .run()
          })

          test('should not fetch entities if already exists in store', () => {
            const entityStore = {1: []}
            const page = 1
            return expectSaga(sagas.requestEntities, page)
              .provide([[select(sagas.listSelector), {entityStore}]])
              .not.call.like({fn: sagas.fetchEntitiesAndAddToStore})
              .call(sagas.displayEntity, page)
              .spawn(sagas.delayedPreloadNextPage, page)
              .run()
          })
        })

        describe('displayEntity saga', () => {
          test('should display entity', () => {
            const page = 1
            const gen = sagas.displayEntity(page)
            const entities = [{}]
            const state = generateState({1: entities})
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next(state).value).to.eql(put(actions.setEntities(entities)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('setSorting saga', () => {
          const entityModel = {
            paths: {
              update_timestamp: {}
            }
          }

          const formDefinition = {}
          test('should extract sorting of form', () => {
            const sorting = [{field: 'firstname', order: 'asc'}]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), sorting],
                [select(sagas.inputSelector), {}],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters: null}]
              ])
              .put(actions.setSorting(sorting))
              .run()
          })

          test('should set fallback if not defined in form and search filters are not set', () => {
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []],
                [select(sagas.inputSelector), {}],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters: null}]
              ])
              .put(actions.setSorting([{field: sagas.FALLBACK_SORTING_FIELD, order: 'desc'}]))
              .run()
          })

          test('should set fallback if no active search filter has order by', () => {
            const searchFilters = [
              {active: true, orderBy: ''},
              {active: false, orderBy: 'firstname'}
            ]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []],
                [select(sagas.inputSelector), {}],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters}]
              ])
              .put(actions.setSorting([{field: sagas.FALLBACK_SORTING_FIELD, order: 'desc'}]))
              .run()
          })

          test('should set empty array as sorting if an active search filter has order by', () => {
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []],
                [select(sagas.inputSelector), {}],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters: [{active: true, orderBy: 'firstname'}]}]
              ])
              .put(actions.setSorting([]))
              .run()
          })

          test('should prefer sorting from preferences over table and input', () => {
            const inputSorting = [{field: 'input', order: 'asc'}]
            const formSorting = [{field: 'firstname', order: 'asc'}]
            const preferenceSorting = [{field: 'other', order: 'desc'}]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), formSorting],
                [select(sagas.inputSelector), inputSorting],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: preferenceSorting}],
                [select(sagas.searchFormSelector), {searchFilters: null}]
              ])
              .put(actions.setSorting(preferenceSorting))
              .run()
          })

          test('should prefer sorting from input over table', () => {
            const inputSorting = [{field: 'input', order: 'asc'}]
            const formSorting = [{field: 'firstname', order: 'asc'}]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), formSorting],
                [select(sagas.inputSelector), {sorting: inputSorting}],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters: null}]
              ])
              .put(actions.setSorting(inputSorting))
              .run()
          })
        })

        describe('loadData saga', () => {
          test('should load data of provided page', () =>
            expectSaga(sagas.loadData, 2)
              .provide([[matchers.fork.fn(sagas.countEntities)], [matchers.call.fn(sagas.requestEntities)]])
              .put(actions.setInProgress(true))
              .put(actions.clearEntityStore())
              .call(sagas.requestEntities, 2)
              .put(actions.setInProgress(false))
              .fork(sagas.countEntities)
              .run())
        })

        describe('countEntities saga', () => {
          test('should call entity count and set result', () => {
            const entityName = 'User'
            const formDefinition = {
              children: [
                {
                  componentType: 'table',
                  endpoint: '/fetch'
                }
              ]
            }
            const showSelectedRecords = false

            const entityCount = 100

            const state = {
              selection: {showSelectedRecords},
              input: {entityName},
              list: {formDefinition},
              entityList: {}
            }

            return (
              expectSaga(sagas.countEntities)
                .provide([
                  [select(sagas.stateSelector), state],
                  [select(sagas.inputSelector), state.input],
                  [matchers.call.fn(sagas.getBasicQuery), {}],
                  [matchers.call.fn(rest.fetchEntityCount), entityCount]
                ])
                // .call(rest.fetchEntityCount, 'User', {}, {method: 'GET', endpoint: '/fetch'})
                // .put(actions.setEntityCount(entityCount))
                // .put(selectionActions.setQueryCount(entityCount))
                .run()
            )
          })

          test('should set entityCount as queryCount if seletion is active', () => {
            const entityName = 'User'
            const formDefinition = {
              children: [
                {
                  componentType: 'table',
                  endpoint: '/fetch'
                }
              ]
            }
            const showSelectedRecords = true
            const selection = ['1', '3', '99']

            const entityCount = 100

            const state = {
              selection: {showSelectedRecords, selection},
              input: {entityName},
              list: {formDefinition},
              entityList: {}
            }

            return expectSaga(sagas.countEntities)
              .provide([
                [select(sagas.stateSelector), state],
                [select(sagas.inputSelector), state.input],
                [matchers.call.fn(sagas.getBasicQuery), {}],
                [matchers.call.fn(rest.fetchEntityCount), entityCount]
              ])
              .call(rest.fetchEntityCount, 'User', {}, {method: 'GET', endpoint: '/fetch'})
              .put(actions.setEntityCount(3))
              .put(selectionActions.setQueryCount(entityCount))
              .run()
          })

          test('should use endpoint from search list form if set and if search mode', () => {
            const entityName = 'User'
            const formDefinition = {
              children: [
                {
                  componentType: 'table',
                  endpoint: '/fetch'
                }
              ]
            }
            const searchListFormDefinition = {
              children: [
                {
                  componentType: 'table',
                  endpoint: '/search-fetch'
                }
              ]
            }

            const showSelectedRecords = true
            const selection = ['1', '3', '99']

            const entityCount = 100

            const state = {
              selection: {showSelectedRecords, selection},
              input: {entityName},
              list: {formDefinition, searchListFormDefinition},
              entityList: {}
            }

            return expectSaga(sagas.countEntities)
              .provide([
                [select(sagas.stateSelector), state],
                [select(sagas.inputSelector), state.input],
                [matchers.call.fn(sagas.getBasicQuery), {hasUserChanges: true}],
                [matchers.call.fn(rest.fetchEntityCount), entityCount]
              ])
              .call(rest.fetchEntityCount, 'User', {hasUserChanges: true}, {method: 'GET', endpoint: '/search-fetch'})
              .run()
          })
        })

        describe('loadFormDefinition saga', () => {
          test('should load form definition', () => {
            const fetchedFormDefinition = {id: 'User_list', children: []}
            const formName = 'User'
            const scope = 'list'
            const actionCreator = actions.setFormDefinition
            const modifyFormDefinition = formDefinition => formDefinition
            return expectSaga(sagas.loadFormDefinition, formName, scope, actionCreator)
              .provide([
                [select(sagas.listSelector), {}],
                [call(rest.fetchForm, formName, scope), fetchedFormDefinition],
                [select(sagas.inputSelector), {modifyFormDefinition}],
                [select(sagas.entityListSelector), {}]
              ])
              .put(actionCreator(fetchedFormDefinition))
              .run()
          })

          test('should handle report ids', () => {
            const entityName = 'Entity_name'
            const fetchedFormDefinition = {children: [], modelName: entityName}
            const modifiedFormDefinition = {children: [{id: 'fake modified child'}]}
            const reportDefinitions = [{}]
            const formName = 'User'
            const scope = 'list'
            const actionCreator = actions.setFormDefinition
            const modifyFormDefinition = formDefinition => formDefinition
            return expectSaga(sagas.loadFormDefinition, formName, scope, actionCreator)
              .provide([
                [matchers.call.fn(rest.fetchForm), fetchedFormDefinition],
                [select(sagas.inputSelector), {modifyFormDefinition, reportIds: ['report-id']}],
                [select(sagas.listSelector), {}],
                [select(sagas.entityListSelector), {}],
                [matchers.call.fn(form.addReports), modifiedFormDefinition],
                [take(reports.SET_REPORTS), {payload: {reports: reportDefinitions}}]
              ])
              .put(reports.loadReports(['report-id'], entityName, 'list'))
              .call.like({
                fn: form.addReports,
                args: [fetchedFormDefinition, reportDefinitions]
              })
              .put(actionCreator(modifiedFormDefinition))
              .run()
          })

          test('should not load form definition if already loaded', () => {
            const selectFormDefinition = {id: 'User_list', children: []}
            const actionCreator = actions.setFormDefinition
            return expectSaga(sagas.loadFormDefinition, 'User', 'list', actionCreator)
              .provide([[select(sagas.listSelector), {formDefinition: selectFormDefinition}]])
              .not.put(actions.setFormDefinition(selectFormDefinition))
              .put(actions.setConstriction(null))
              .run()
          })

          test('should load form definition if other formName is passed', () => {
            const selectFormDefinition = {id: 'Root_docs_list_item_list', children: []}
            const fetchedFormDefinition = {id: 'Docs_list_item_list', children: []}
            const formName = 'Docs_list_item'
            const scope = 'list'
            const actionCreator = actions.setFormDefinition
            const modifyFormDefinition = formDefinition => formDefinition
            return expectSaga(sagas.loadFormDefinition, formName, scope, actionCreator)
              .provide([
                [select(sagas.listSelector), {formDefinition: selectFormDefinition}],
                [select(sagas.entityListSelector), {}],
                [call(rest.fetchForm, formName, scope), fetchedFormDefinition],
                [select(sagas.inputSelector), {modifyFormDefinition}]
              ])
              .put(actionCreator(fetchedFormDefinition))
              .run()
          })
        })

        describe('loadEntityModel saga', () => {
          test('should load the entity model', () => {
            const model = {name: 'User'}
            return expectSaga(sagas.loadEntityModel)
              .provide([[matchers.call.fn(rest.fetchModel), model]])
              .put(actions.setEntityModel(model))
              .run()
          })
        })

        describe('onRowClick saga', () => {
          test('should not change selection if selectOnRowClick not true', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: false}).value).to.eql(
              put(externalEvents.fireExternalEvent('onRowClick', {id: '1'}))
            )
            expect(gen.next().done).to.be.true
          })

          test('should select a deselected row on click', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: true}).value).to.eql(select(sagas.selectionSelector))
            expect(gen.next({selection: ['2']}).value).to.eql(put(selectionActions.onSelectChange(['1'], true)))
            expect(gen.next().value).to.eql(put(externalEvents.fireExternalEvent('onRowClick', {id: '1'})))
            expect(gen.next().done).to.be.true
          })

          test('should deselect a selected row on click', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: true}).value).to.eql(select(sagas.selectionSelector))
            expect(gen.next({selection: ['1']}).value).to.eql(put(selectionActions.onSelectChange(['1'], false)))
            expect(gen.next().value).to.eql(put(externalEvents.fireExternalEvent('onRowClick', {id: '1'})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('prepareEndpointUrl', () => {
          test('should replace parentKey if parent exists', () => {
            const input = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([[select(sagas.inputSelector), input]])
              .returns(expectedResult)
              .run()
          })

          test('should remove parentKey placeholder if parent is undefined', () => {
            const input = {parent: null}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User//test' // REST API doesn't care about duplicate slash

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([[select(sagas.inputSelector), input]])
              .returns(expectedResult)
              .run()
          })

          test('should use search endpoint if defined and has user search input', () => {
            const input = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test/searchresults'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test/searchresults'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, true)
              .provide([[select(sagas.inputSelector), input]])
              .returns(expectedResult)
              .run()
          })

          test('should use regular endpoint if search endpoint not defined and has user search input', () => {
            const input = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = undefined
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, true)
              .provide([[select(sagas.inputSelector), input]])
              .returns(expectedResult)
              .run()
          })

          test('should use regular endpoint if search endpoint defined and does not have user search input', () => {
            const input = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test/searchresults'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, false)
              .provide([[select(sagas.inputSelector), input]])
              .returns(expectedResult)
              .run()
          })
        })

        describe('getBasicQuery', () => {
          test('should return an object with correct attributes', () => {
            const inputState = {
              searchFilters: ['filter1', 'filter2'],
              tql: 'foo == "bar"',
              keys: ['235', '18', '120']
            }
            const searchForm = {
              formFieldsFlat: {
                relGender: 'single-remote-field'
              }
            }
            const selection = {
              showSelectedRecords: false
            }
            const searchFormValues = {
              relParent: {key: '1'},
              relGender: {key: '3'},
              txtFulltext: 'full',
              searchFilter: [{uniqueId: 'filter2'}, {uniqueId: 'filter3'}]
            }

            const expectedResult = {
              filter: ['filter1', 'filter2', 'filter3'],
              where: '(foo == "bar") and (relParent.pk == 1 and relGender.pk == 3 and txtFulltext ~= "*full*")',
              keys: ['235', '18', '120'],
              hasUserChanges: true
            }

            return expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.searchFormSelector), searchForm],
                [select(sagas.selectionSelector), selection],
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), {}],
                [matchers.call.fn(getSearchFormValues), searchFormValues]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return an object with hasUserChanges `false` if has only input attributes', () => {
            const inputState = {searchFilters: ['filter1', 'filter2'], tql: 'foo == "bar"'}
            const searchForm = {
              formFieldsFlat: {
                relGender: 'single-remote-field'
              }
            }
            const selection = {
              showSelectedRecords: false
            }
            const searchFormValues = {}

            const expectedResult = {
              filter: ['filter1', 'filter2'],
              where: '(foo == "bar")',
              hasUserChanges: false
            }

            return expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.searchFormSelector), searchForm],
                [select(sagas.selectionSelector), selection],
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), {}],
                [matchers.call.fn(getSearchFormValues), searchFormValues]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return tql if show selected is true', async () => {
            const selection = {
              showSelectedRecords: true,
              selection: ['1', '22', '99']
            }

            const saga = await expectSaga(sagas.getBasicQuery, true)
              .provide([
                [select(sagas.selectionSelector), selection],
                [select(sagas.listSelector), {}]
              ])
              .run()

            expect(saga.returnValue).to.have.property('keys')
          })

          test('should handle query view', () => {
            const inputState = {keys: ['1', '2']}
            const listState = {constriction: 'constriction'}
            const searchForm = {
              queryViewVisible: true,
              query: 'query'
            }
            const selection = {
              showSelectedRecords: false
            }

            const expectedResult = {
              where: 'query',
              constriction: 'constriction',
              keys: ['1', '2'],
              hasUserChanges: true
            }

            return expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.searchFormSelector), searchForm],
                [select(sagas.selectionSelector), selection],
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), listState]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should add constriction of list state (= constriction from list form)', async () => {
            const inputState = {constriction: null}
            const listState = {constriction: 'my_list_constriction'}

            const expectedResult = {
              constriction: 'my_list_constriction',
              hasUserChanges: false
            }

            return expectSaga(sagas.getBasicQuery, true)
              .provide([
                [select(sagas.searchFormSelector), {}],
                [select(sagas.selectionSelector), {}],
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), listState],
                [matchers.call.fn(getSearchFormValues), {}]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should add input constriction of list state if set (overrides list form constriction)', async () => {
            const inputState = {constriction: 'my_input_constriction'}
            const listState = {constriction: 'my_list_constriction'}

            const expectedResult = {
              constriction: 'my_input_constriction',
              hasUserChanges: false
            }

            return expectSaga(sagas.getBasicQuery, true)
              .provide([
                [select(sagas.searchFormSelector), {}],
                [select(sagas.selectionSelector), {}],
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), listState],
                [matchers.call.fn(getSearchFormValues), {}]
              ])
              .returns(expectedResult)
              .run()
          })
        })

        describe('preloadNextPage saga', () => {
          test('should load next page if not already done and not end', () => {
            const inputState = {limit: 10}
            const listState = {
              entityStore: {},
              entityCount: 20
            }

            return expectSaga(sagas.preloadNextPage, 1)
              .provide([
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), listState],
                [matchers.call.fn(sagas.fetchEntitiesAndAddToStore), null]
              ])
              .call(sagas.fetchEntitiesAndAddToStore, 2)
              .run()
          })

          test('should not load next page if at end', () => {
            const inputState = {limit: 10}
            const listState = {
              entityStore: {},
              entityCount: 20
            }

            return expectSaga(sagas.preloadNextPage, 2)
              .provide([
                [select(sagas.inputSelector), inputState],
                [select(sagas.listSelector), listState],
                [matchers.call.fn(sagas.fetchEntitiesAndAddToStore), null]
              ])
              .not.call(sagas.fetchEntitiesAndAddToStore, 3)
              .run()
          })
        })

        describe('navigateToCreate saga', () => {
          test('should call navigationStrategy', () => {
            const payload = {
              relationName: 'relUser'
            }

            const navigationStrategy = {
              navigateToCreateRelative: () => {}
            }

            return expectSaga(sagas.navigateToCreate, {payload})
              .provide([[select(sagas.inputSelector), {navigationStrategy}]])
              .call(navigationStrategy.navigateToCreateRelative, payload.relationName)
              .run()
          })
        })

        describe('loadDisplayExpressions saga', () => {
          test('should call rest helper with right params and call action to set lazy data', () => {
            const formName = 'User'
            const scope = 'list'
            const paths = ['display1', 'display2']
            const entities = [
              {__key: '23', __model: 'User'},
              {__key: '24', __model: 'User'}
            ]

            const fakeResult = {formName, displayExpressions: []}

            return expectSaga(sagas.loadDisplayExpressions, formName, scope, paths, entities)
              .provide([[matchers.call.fn(rest.fetchDisplayExpressions), fakeResult]])
              .call(rest.fetchDisplayExpressions, formName, scope, ['23', '24'], paths, 'User')
              .put(actions.setLazyData('displayExpressions', formName, fakeResult))
              .run()
          })
        })

        describe('loadRelationDisplays saga', () => {
          test('should call rest helper with right params and call action to set lazy data', () => {
            const relationFields = ['relEntity1', 'relEntity2']
            const entities = [{__key: '23'}, {__key: '24'}]
            const listState = {
              lazyData: {
                defaultDisplays: {}
              }
            }

            const fakeDisplayRequest = {relEntity1: [1]}
            const fakeDisplayResponse = {
              relEntity1: {
                1: 'E 1',
                2: 'E 2'
              },
              relEntity2: {
                1: 'E2 1'
              }
            }

            return expectSaga(sagas.loadRelationDisplays, relationFields, entities)
              .provide([
                [select(sagas.listSelector), listState],
                [matchers.call.fn(api.getPathDisplayRequest), fakeDisplayRequest],
                [matchers.call.fn(rest.fetchDisplays), fakeDisplayResponse]
              ])
              .put(actions.setLazyData('defaultDisplays', 'relEntity1', fakeDisplayResponse.relEntity1))
              .put(actions.setLazyData('defaultDisplays', 'relEntity2', fakeDisplayResponse.relEntity2))
              .run()
          })
        })

        describe('navigateToAction saga', () => {
          test('should call external event navigateToAction', () => {
            const payload = {
              selection: {type: 'ID'},
              definition: {appId: 'input-edit'}
            }

            const navigationStrategy = {
              navigateToActionRelative: () => {}
            }

            return expectSaga(sagas.navigateToAction, {payload})
              .provide([[select(sagas.inputSelector), {navigationStrategy}]])
              .call(navigationStrategy.navigateToActionRelative, payload.definition, payload.selection)
              .run()
          })
        })

        describe('remoteEvent saga', () => {
          const payload = {
            entities: [
              {entityName: 'User', key: '1'},
              {entityName: 'Principal', key: '2'}
            ]
          }
          const createEventAction = remoteEvents.remoteEvent({
            type: 'entity-create-event',
            payload
          })
          const deleteEventAction = remoteEvents.remoteEvent({
            type: 'entity-delete-event',
            payload
          })
          const updateEventAction = remoteEvents.remoteEvent({
            type: 'entity-update-event',
            payload
          })

          const userListState = {
            entityModel: {name: 'User'}
          }
          const classroomListState = {
            entityModel: {name: 'Classroom'}
          }

          const expectReload = (listState, remoteEvent) =>
            expectSaga(sagas.remoteEvent, remoteEvent)
              .provide([[select(sagas.listSelector), listState], [call(sagas.reloadData)]])
              .call(sagas.reloadData)
              .run()

          const expectNoReload = (listState, remoteEvent) =>
            expectSaga(sagas.remoteEvent, remoteEvent)
              .provide([[select(sagas.listSelector), listState]])
              .not.call(sagas.reloadData)
              .run()

          test('should reload list if relevant create event', () => {
            return expectReload(userListState, createEventAction)
          })

          test('should not reload list if irrelevant create event', () => {
            return expectNoReload(classroomListState, createEventAction)
          })

          test('should reload list if relevant delete event', () => {
            return expectReload(userListState, deleteEventAction)
          })

          test('should not reload list if irrelevant delete event', () => {
            return expectNoReload(classroomListState, deleteEventAction)
          })

          test('should reload list if relevant update event', () => {
            return expectReload(userListState, updateEventAction)
          })

          test('should not reload list if irrelevant update event', () => {
            return expectNoReload(classroomListState, updateEventAction)
          })

          test('should clean up selection on delete event', () => {
            const deleteEventActionWithMultipleUsers = remoteEvents.remoteEvent({
              type: 'entity-delete-event',
              payload: {
                entities: [
                  {entityName: 'User', key: '1'},
                  {entityName: 'Login', key: '2'},
                  {entityName: 'User', key: '99'}
                ]
              }
            })

            const listState = {
              entityModel: {name: 'User'}
            }

            return expectSaga(sagas.remoteEvent, deleteEventActionWithMultipleUsers)
              .provide([[select(sagas.listSelector), listState], [call(sagas.reloadData)]])
              .put(selectionActions.onSelectChange(['1', '99'], false))
              .run()
          })

          test('should trigger external action event', () => {
            const triggerActionEvent = remoteEvents.remoteEvent({
              type: 'action-trigger-event',
              payload: {
                func: actions.setMarked,
                args: [true]
              }
            })

            const listState = {
              entityModel: {name: 'User'}
            }

            return expectSaga(sagas.remoteEvent, triggerActionEvent)
              .provide([[select(sagas.listSelector), listState]])
              .put(actions.setMarked(true))
              .run()
          })
        })

        describe('queryChanged saga', () => {
          test('should set query and call external event onSearchChange', () => {
            const query = {tql: 'firstname == "Max"'}

            return expectSaga(sagas.queryChanged)
              .provide([[call(sagas.getBasicQuery), query]])
              .put(selectionActions.setQuery(query))
              .put(externalEvents.fireExternalEvent('onSearchChange', {query}))
              .run()
          })
        })

        describe('loadMarkings saga', () => {
          test('load markings of entities', () => {
            const listState = {
              entityModel: {name: 'User', markable: true},
              formDefinition: {markable: true}
            }

            const entities = [{__key: '235'}, {__key: '918'}]

            const selection = {
              entityName: 'User',
              type: 'ID',
              ids: ['235', '918']
            }

            const markings = {
              235: false,
              918: true
            }

            return expectSaga(sagas.loadMarkings, entities)
              .provide([
                [select(sagas.listSelector), listState],
                [call(rest.fetchMarkings, selection), markings],
                [call(sagas.setLazyDataMarked, 'User', markings)]
              ])
              .call(sagas.setLazyDataMarked, 'User', markings)
              .run()
          })

          test('do not load markings if entity not markable', () => {
            const listState = {
              entityModel: {name: 'User', markable: false},
              formDefinition: {markable: true}
            }

            const entities = [{__key: '235'}, {__key: '918'}]

            return expectSaga(sagas.loadMarkings, entities)
              .provide([[select(sagas.listSelector), listState]])
              .run()
          })

          test('do not load markings if form not markable', () => {
            const listState = {
              entityModel: {name: 'User', markable: true},
              formDefinition: {markable: false}
            }

            const entities = [{__key: '235'}, {__key: '918'}]

            return expectSaga(sagas.loadMarkings, entities)
              .provide([[select(sagas.listSelector), listState]])
              .run()
          })

          test('do not load markings if entities empty', () => {
            const listState = {
              entityModel: {name: 'User', markable: true},
              formDefinition: {markable: true}
            }

            const entities = []

            return expectSaga(sagas.loadMarkings, entities)
              .provide([[select(sagas.listSelector), listState]])
              .run()
          })
        })

        describe('setMarked saga', () => {
          test('should set marked of single entity', () => {
            const action = actions.setMarked('User', '235', true)
            return expectSaga(sagas.setMarked, action)
              .provide([
                [call(sagas.setLazyDataMarked, 'User', {235: true})],
                [call(rest.setMarked, 'User', '235', true)]
              ])
              .call(sagas.setLazyDataMarked, 'User', {235: true})
              .call(rest.setMarked, 'User', '235', true)
              .run()
          })
        })

        describe('toggleMarkings saga', () => {
          test('should set marked to true if at least one unmarked', () =>
            testToggleMarkings(
              {
                843: true,
                912: false
              },
              true
            ))

          test('should set marked to true if all unmarked', () =>
            testToggleMarkings(
              {
                843: false,
                912: false
              },
              true
            ))

          test('should set marked to false if all marked', () =>
            testToggleMarkings(
              {
                843: true,
                912: true
              },
              false
            ))

          const testToggleMarkings = (oldMarkings, expectedNewMarked) => {
            const selection = {
              entityName: 'User',
              type: 'ID',
              ids: ['843', '912']
            }

            const expectedNewMarkings = {
              843: expectedNewMarked,
              912: expectedNewMarked
            }

            return expectSaga(sagas.toggleMarkings, actions.toggleMarkings(selection))
              .provide([
                [call(rest.fetchMarkings, selection), oldMarkings],
                [call(rest.setSelectionMarked, selection, expectedNewMarked), expectedNewMarkings],
                [call(sagas.setLazyDataMarked, selection.entityName, expectedNewMarkings)]
              ])
              .call(rest.setSelectionMarked, selection, expectedNewMarked)
              .call(sagas.setLazyDataMarked, selection.entityName, expectedNewMarkings)
              .run()
          }

          test('should set marked to true if all unmarked', () => {
            const selection = {
              entityName: 'User',
              type: 'ID',
              ids: ['843', '912']
            }

            const oldMarkings = {
              843: true,
              912: false
            }

            const newMarkings = {
              843: true,
              912: true
            }

            return expectSaga(sagas.toggleMarkings, actions.toggleMarkings(selection))
              .provide([
                [call(rest.fetchMarkings, selection), oldMarkings],
                [call(rest.setSelectionMarked, selection, true), newMarkings],
                [call(sagas.setLazyDataMarked, selection.entityName, newMarkings)]
              ])
              .call(rest.setSelectionMarked, selection, true)
              .call(sagas.setLazyDataMarked, selection.entityName, newMarkings)
              .run()
          })
        })

        describe('setLazyDataMarked saga', () => {
          test('should update markings lazy data', () => {
            const lazyData = {
              markings: {
                Address: {
                  81: false
                },
                User: {
                  642: true,
                  831: true
                }
              }
            }

            const newMarkings = {
              642: false,
              999: false
            }

            const expectedUserMarkings = {
              642: false,
              831: true,
              999: false
            }

            return expectSaga(sagas.setLazyDataMarked, 'User', newMarkings)
              .provide([[select(sagas.listSelector), {lazyData}]])
              .put(actions.setLazyData('markings', 'User', expectedUserMarkings))
              .run()
          })
        })

        describe('customEndpointActionPrepareHandler', () => {
          const idSelection = {
            type: 'ID',
            entityName: 'User',
            ids: ['1', '2', '3']
          }
          const querySelection = {
            type: 'QUERY',
            entityName: 'User',
            query: {}
          }

          test('should do nothing if not QUERY selection', () =>
            expectSaga(sagas.customEndpointActionPrepareHandler, {selection: idSelection})
              .returns({abort: false})
              .run())

          test('should do nothing if no custom endpoint', () => {
            const state = {
              list: {
                formDefinition: {
                  children: [
                    {
                      componentType: 'TABLE',
                      endpoint: null
                    }
                  ]
                }
              }
            }

            return expectSaga(sagas.customEndpointActionPrepareHandler, {selection: querySelection})
              .provide([[select(sagas.stateSelector), state]])
              .returns({abort: false})
              .run()
          })

          test('should fetch keys and return new selection if custom endpoint', () => {
            const state = {
              list: {
                formDefinition: {
                  children: [
                    {
                      componentType: 'table',
                      endpoint: '/my-custom-endpoint'
                    }
                  ]
                }
              },
              input: {
                entityName: 'User'
              },
              intl: {}
            }

            return expectSaga(sagas.customEndpointActionPrepareHandler, {selection: querySelection})
              .provide([
                [select(sagas.stateSelector), state],
                [select(sagas.inputSelector), state.input],
                [matchers.call.fn(rest.fetchEntities), ['1', '2', '3']]
              ])
              .returns({abort: false, selection: idSelection})
              .run()
          })
        })
      })
    })
  })
})
