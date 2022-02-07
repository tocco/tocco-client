import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {externalEvents, remoteEvents, rest} from 'tocco-app-extensions'
import {api} from 'tocco-util'

import {
  getClickable,
  getConstriction,
  getEndpoint,
  getFields,
  getSearchEndpoint,
  getSelectable,
  getSorting
} from '../../util/api/forms'
import * as searchFormActions from '../searchForm/actions'
import {getSearchFormValues} from '../searchForm/sagas'
import * as selectionActions from '../selection/actions'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const generateState = (entityStore = {}, page, markable = true) => ({
  initialized: false,
  formName: '',
  sorting: [],
  limit: '',
  entityStore,
  formDefinition: {},
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
                [select(sagas.entityListSelector), {entityName, formName}],
                [select(sagas.listSelector), {scope}],
                [matchers.call.fn(sagas.loadFormDefinition)],
                [matchers.call.fn(sagas.loadEntityModel)]
              ])
              .call(sagas.loadFormDefinition, formName, scope)
              .call(sagas.loadEntityModel, entityName)
              .put(actions.setInitialized())
              .run()
          })
        })

        describe('changePage saga', () => {
          test('should set currentPage and requestEntities', () => {
            const page = 1
            const gen = sagas.changePage({payload: {page: page}})
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

            const gen = sagas.fetchEntitiesAndAddToStore(1)
            expect(gen.next().value).to.eql(select(sagas.entityListSelector))
            expect(gen.next({}).value).to.eql(select(sagas.preferencesSelector))
            expect(gen.next({entityName, formName}).value).to.eql(select(sagas.listSelector))
            expect(gen.next({entityStore}).done).to.be.true
          })

          test('should add entities to store', () => {
            const listViewState = generateState({scope: 'list'}, 1)
            const entities = []
            const fields = ['firstname', 'lastname']

            const page = 1

            return expectSaga(sagas.fetchEntitiesAndAddToStore, page)
              .provide([
                [select(sagas.entityListSelector), {formName: 'UserTest', entityName: 'User'}],
                [select(sagas.listSelector), listViewState],
                [select(sagas.preferencesSelector), {columns: {}}],
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
              .provide([[select(sagas.searchFormSelector), {searchFilters: searchFilters}]])
              .returns(false)
              .run()
          })

          test('active search filter with order by', () => {
            const searchFilters = [{active: true, orderBy: 'firstname'}]
            return expectSaga(sagas.hasActiveSearchFilterOrderBy)
              .provide([[select(sagas.searchFormSelector), {searchFilters: searchFilters}]])
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
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters: searchFilters}]
              ])
              .put(actions.setSorting([{field: sagas.FALLBACK_SORTING_FIELD, order: 'desc'}]))
              .run()
          })

          test('should set empty array as sorting if an active search filter has order by', () => {
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}],
                [select(sagas.searchFormSelector), {searchFilters: [{active: true, orderBy: 'firstname'}]}]
              ])
              .put(actions.setSorting([]))
              .run()
          })

          test('should prefer sorting from preferences', () => {
            const formSorting = [{field: 'firstname', order: 'asc'}]
            const preferenceSorting = [{field: 'other', order: 'desc'}]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), formSorting],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: preferenceSorting}],
                [select(sagas.searchFormSelector), {searchFilters: null}]
              ])
              .put(actions.setSorting(preferenceSorting))
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
          test('should call entity count end set result', () => {
            const entityName = 'User'
            const endpoint = '/fetch'
            const showSelectedRecords = false

            const entityCount = 100

            return expectSaga(sagas.countEntities)
              .provide([
                [select(sagas.selectionSelector), {showSelectedRecords}],
                [select(sagas.inputSelector), {entityName}],
                [select(sagas.listSelector), {endpoint}],
                [select(sagas.entityListSelector), {}],
                [matchers.call.fn(sagas.getBasicQuery), {}],
                [matchers.call.fn(rest.fetchEntityCount), entityCount]
              ])
              .put(actions.setEntityCount(entityCount))
              .put(selectionActions.setQueryCount(entityCount))
              .run()
          })

          test('should set entityCount  as queryCount if seletion is active', () => {
            const entityName = 'User'
            const endpoint = '/fetch'
            const showSelectedRecords = true
            const selection = ['1', '3', '99']

            const entityCount = 100

            return expectSaga(sagas.countEntities)
              .provide([
                [select(sagas.selectionSelector), {showSelectedRecords, selection}],
                [select(sagas.inputSelector), {entityName}],
                [select(sagas.listSelector), {endpoint}],
                [select(sagas.entityListSelector), {}],
                [matchers.call.fn(sagas.getBasicQuery), {}],
                [matchers.call.fn(rest.fetchEntityCount), entityCount]
              ])
              .put(actions.setEntityCount(3))
              .put(selectionActions.setQueryCount(entityCount))
              .run()
          })
        })

        describe('loadFormDefinition saga', () => {
          test('should load form definition', () => {
            const fetchedFormDefinition = {}
            return expectSaga(sagas.loadFormDefinition)
              .provide([
                [matchers.call.fn(sagas.extractFormInformation)],
                [matchers.call.fn(rest.fetchForm), fetchedFormDefinition]
              ])
              .put(actions.setFormDefinition(fetchedFormDefinition))
              .call(sagas.extractFormInformation, fetchedFormDefinition)
              .run()
          })
        })

        describe('extractFormInformation saga', () => {
          test('should put infos gathered from the form defintion', () => {
            const fetchedFormDefinition = {}

            const selectable = true
            const clickable = true
            const endpoint = 'customEndpoint'
            const searchEndpoint = 'customSearchEndpoint'
            const constriction = 'sampleConstriction'

            return expectSaga(sagas.extractFormInformation, fetchedFormDefinition)
              .provide([
                [matchers.call.fn(getSelectable), selectable],
                [matchers.call.fn(getClickable), clickable],
                [matchers.call.fn(getEndpoint), endpoint],
                [matchers.call.fn(getSearchEndpoint), searchEndpoint],
                [matchers.call.fn(getConstriction), constriction]
              ])
              .put(actions.setFormSelectable(selectable))
              .put(actions.setFormClickable(clickable))
              .put(actions.setEndpoint(endpoint))
              .put(actions.setSearchEndpoint(searchEndpoint))
              .put(actions.setConstriction(constriction))
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
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([[select(sagas.entityListSelector), entityList]])
              .returns(expectedResult)
              .run()
          })

          test('should remove parentKey placeholder if parent is undefined', () => {
            const entityList = {parent: null}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User//test' // REST API doesn't care about duplicate slash

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([[select(sagas.entityListSelector), entityList]])
              .returns(expectedResult)
              .run()
          })

          test('should use search endpoint if defined and has user search input', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test/searchresults'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test/searchresults'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, true)
              .provide([[select(sagas.entityListSelector), entityList]])
              .returns(expectedResult)
              .run()
          })

          test('should use regular endpoint if search endpoint not defined and has user search input', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = undefined
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, true)
              .provide([[select(sagas.entityListSelector), entityList]])
              .returns(expectedResult)
              .run()
          })

          test('should use regular endpoint if search endpoint defined and does not have user search input', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test/searchresults'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, false)
              .provide([[select(sagas.entityListSelector), entityList]])
              .returns(expectedResult)
              .run()
          })
        })

        describe('getBasicQuery', () => {
          test('should return an object with correct attributes', () => {
            const listState = {
              inputSearchFilters: ['filter1', 'filter2'],
              inputTql: 'foo == "bar"',
              inputKeys: ['235', '18', '120']
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
                [select(sagas.listSelector), listState],
                [matchers.call.fn(getSearchFormValues), searchFormValues]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return an object with hasUserChanges `false` if has only input attributes', () => {
            const listState = {inputSearchFilters: ['filter1', 'filter2'], inputTql: 'foo == "bar"'}
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
                [select(sagas.listSelector), listState],
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
            const listState = {inputKeys: ['1', '2'], constriction: 'constriction'}
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
                [select(sagas.listSelector), listState]
              ])
              .returns(expectedResult)
              .run()
          })
        })

        describe('preloadNextPage saga', () => {
          test('should load next page if not already done and not end', () => {
            const listState = {
              entityStore: {},
              limit: 10,
              entityCount: 20
            }

            return expectSaga(sagas.preloadNextPage, 1)
              .provide([
                [select(sagas.listSelector), listState],
                [matchers.call.fn(sagas.fetchEntitiesAndAddToStore), null]
              ])
              .call(sagas.fetchEntitiesAndAddToStore, 2)
              .run()
          })

          test('should not load next page if at end', () => {
            const listState = {
              entityStore: {},
              limit: 10,
              entityCount: 20
            }

            return expectSaga(sagas.preloadNextPage, 2)
              .provide([
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

          const expectNoReload = listState =>
            expectSaga(sagas.remoteEvent, createEventAction)
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
            const deleteEventAction = remoteEvents.remoteEvent({
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

            return expectSaga(sagas.remoteEvent, deleteEventAction)
              .provide([[select(sagas.listSelector), listState], [call(sagas.reloadData)]])
              .put(selectionActions.onSelectChange(['1', '99'], false))
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
      })
    })
  })
})
