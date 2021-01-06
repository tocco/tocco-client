import {expectSaga} from 'redux-saga-test-plan'
import {externalEvents, rest, remoteEvents} from 'tocco-app-extensions'
import * as matchers from 'redux-saga-test-plan/matchers'
import {put, select, call, spawn, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {api} from 'tocco-util'

import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as selectionActions from '../selection/actions'
import * as entityListActions from '../entityList/actions'
import rootSaga, * as sagas from './sagas'
import {
  getSorting,
  getSelectable,
  getClickable,
  getFields,
  getEndpoint,
  getSearchEndpoint,
  getConstriction
} from '../../util/api/forms'
import {getSearchFormValues} from '../searchForm/sagas'

const generateState = (entityStore = {}, page) => ({
  initialized: false,
  formName: '',
  sorting: [],
  limit: '',
  entityStore,
  formDefinition: {},
  page
})

describe('entity-list', () => {
  describe('modules', () => {
    describe('list', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.INITIALIZE, sagas.initialize),
              takeLatest(actions.CHANGE_PAGE, sagas.changePage),
              takeLatest(searchFormActions.EXECUTE_SEARCH, sagas.loadData, 1),
              takeLatest(searchFormActions.EXECUTE_SEARCH, sagas.queryChanged),
              takeEvery(actions.SET_SORTING, sagas.reloadData),
              takeLatest(actions.SET_SORTING_INTERACTIVE, sagas.reloadData),
              takeEvery(actions.RESET_DATA_SET, sagas.loadData, 1),
              takeLatest(actions.REFRESH, sagas.loadData),
              takeLatest(actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate),
              takeLatest(actions.NAVIGATE_TO_ACTION, sagas.navigateToAction),
              takeLatest(selectionActions.RELOAD_DATA, sagas.loadData, 1),
              takeLatest(actions.ON_ROW_CLICK, sagas.onRowClick),
              takeLatest(entityListActions.SET_PARENT, sagas.setParent),
              takeEvery(remoteEvents.REMOTE_EVENT, sagas.remoteEvent)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          test('should initialize the list', () => {
            const entityName = 'Test_entity'
            const formName = 'Base_form'
            const formDefinition = null
            const entityModel = {}
            const initialized = false

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.entityListSelector))
            expect(gen.next({entityName, formName}).value).to.eql(select(sagas.listSelector))
            const nextValue = gen.next({formDefinition, entityModel, initialized}).value
            expect(nextValue).to.eql(all([
              call(sagas.loadEntityModel, entityName, entityModel),
              call(sagas.loadFormDefinition, formDefinition, formName)
            ]))

            expect(gen.next().value).to.eql(call(sagas.setSorting))
            expect(gen.next().value).to.eql(call(sagas.loadData, 1))
            expect(gen.next().value).to.eql(call(sagas.queryChanged))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().value).to.eql(put(actions.setInitialized()))
            expect(gen.next().done).to.be.true
          })

          test('should refresh the current page if already initialized', () => {
            const entityName = 'Test_entity'
            const formName = 'form2'
            const columnDefinition = []
            const entityModel = {}
            const initialized = true

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.entityListSelector))
            expect(gen.next({entityName, formName}).value).to.eql(select(sagas.listSelector))
            expect(gen.next({columnDefinition, entityModel, initialized}).value).to.eql(call(sagas.loadData))
            expect(gen.next().value).to.eql(call(sagas.queryChanged))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().value).to.eql(put(actions.setInitialized()))
            expect(gen.next().done).to.be.true
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
          test('should call reset data if list is initialized', () => {
            const initialized = true
            const gen = sagas.reloadData()
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next({initialized}).value).to.eql(call(sagas.loadData, 1))
            expect(gen.next().done).to.be.true
          })

          test('should not call reset data if list isnt initialized', () => {
            const initialized = false
            const gen = sagas.reloadData()
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next({initialized}).done).to.be.true
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
            const listViewState = generateState({}, 1)
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
              .put(actions.addEntitiesToStore(page, entities))
              .run()
          })
        })

        describe('getSearchFilter saga', () => {
          test('should return a string with unique values separated by comma', () => {
            const inputFilers = ['filter1', 'filter2']
            const searchFilter = ['filter1', 'filter3']
            const expectedReturnValue = ['filter1', 'filter2', 'filter3']

            return expectSaga(sagas.getSearchFilter, inputFilers, searchFilter)
              .returns(expectedReturnValue)
              .run()
          })
        })

        describe('requestEntities saga', () => {
          test('should request entities', () => {
            const page = 1
            const gen = sagas.requestEntities(page)

            const state = generateState({}, page)
            state.limit = 50
            state.entityCount = 1000

            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next(state).value).to.eql(call(sagas.fetchEntitiesAndAddToStore, page))
            expect(gen.next().value).to.eql(call(sagas.displayEntity, page))
            expect(gen.next().value).to.eql(spawn(sagas.preloadNextPage, page))
            expect(gen.next().done).to.be.true
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
                [select(sagas.preferencesSelector), {sorting: []}]
              ])
              .put(actions.setSorting(sorting))
              .run()
          })

          test('should set fallback if not defined in form', () => {
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}]
              ])
              .put(actions.setSorting([{field: sagas.FALLBACK_SORTING_FIELD, order: 'desc'}]))
              .run()
          })

          test('should not set sorting if fallback does not exist in model', () => {
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []],
                [select(sagas.listSelector), {entityModel: {paths: {}}, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: []}]
              ])
              .not.put.like({action: {type: 'list/SET_SORTING'}})
              .run()
          })

          test('should prefer sorting from preferences', () => {
            const formSorting = [{field: 'firstname', order: 'asc'}]
            const preferenceSorting = [{field: 'other', order: 'desc'}]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), formSorting],
                [select(sagas.listSelector), {entityModel, formDefinition}],
                [select(sagas.preferencesSelector), {sorting: preferenceSorting}]
              ])
              .put(actions.setSorting(preferenceSorting))
              .run()
          })
        })

        describe('loadData saga', () => {
          test('should not load data if search form is not initialized', () =>
            expectSaga(sagas.loadData)
              .provide([
                [select(sagas.searchFormSelector), {initialized: false}],
                [matchers.fork.fn(sagas.countEntities), null],
                [matchers.call.fn(sagas.requestEntities), null],
                [select(sagas.listSelector), {currentPage: 2}]
              ])
              .not.fork(sagas.countEntities)
              .run(200)
          )

          test('should await the initialization of search for before loading data', () =>
            expectSaga(sagas.loadData)
              .provide([
                [select(sagas.searchFormSelector), {initialized: false}],
                [matchers.fork.fn(sagas.countEntities), null],
                [matchers.call.fn(sagas.requestEntities), null],
                [select(sagas.listSelector), {currentPage: 2}]
              ])
              .dispatch(searchFormActions.setInitialized())
              .fork(sagas.countEntities)
              .run()
          )

          test('should load data of provided page', () => {
            const requestedPage = 223
            return expectSaga(sagas.loadData, requestedPage)
              .provide([
                [select(sagas.searchFormSelector), {initialized: true}],
                [matchers.fork.fn(sagas.countEntities), null],
                [matchers.call.fn(sagas.requestEntities), null],
                [select(sagas.listSelector), {currentPage: 2}]
              ])
              .put(actions.setCurrentPage(requestedPage))
              .call(sagas.requestEntities, requestedPage)
              .run()
          })

          test('should load data of current page if no page is passed', () => {
            const currentPage = 33
            return expectSaga(sagas.loadData)
              .provide([
                [select(sagas.searchFormSelector), {initialized: true}],
                [matchers.fork.fn(sagas.countEntities), null],
                [matchers.call.fn(sagas.requestEntities), null],
                [select(sagas.listSelector), {currentPage}]
              ])
              .not.put(actions.setCurrentPage(currentPage))
              .call(sagas.requestEntities, currentPage)
              .run()
          })

          test('should dispatch inProgress actions', () => {
            const requestedPage = 223
            return expectSaga(sagas.loadData, requestedPage)
              .provide([
                [select(sagas.searchFormSelector), {initialized: true}],
                [matchers.fork.fn(sagas.countEntities), null],
                [matchers.call.fn(sagas.requestEntities), null],
                [select(sagas.listSelector), {currentPage: 2}]
              ])
              .put(actions.setInProgress(true))
              .put(actions.setInProgress(false))
              .run()
          })
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

        describe('loadTableDefinition saga', () => {
          test('should load Columndefinition if not loaded', () => {
            const formDefinition = null
            const formName = 'UserSearch'
            const loadedFormDefinition = {
              children: []
            }

            const selectable = true
            const clickable = true
            const endpoint = 'customEndpoint'
            const searchEndpoint = 'customSearchEndpoint'
            const constriction = 'sampleConstriction'

            return expectSaga(sagas.loadFormDefinition, formDefinition, formName)
              .provide([
                [matchers.call.fn(rest.fetchForm), loadedFormDefinition],
                [matchers.call.fn(getSelectable), selectable],
                [matchers.call.fn(getClickable), clickable],
                [matchers.call.fn(getEndpoint), endpoint],
                [matchers.call.fn(getSearchEndpoint), searchEndpoint],
                [matchers.call.fn(getConstriction), constriction]
              ])
              .call(rest.fetchForm, formName, 'list')
              .put(actions.setFormDefinition(loadedFormDefinition))
              .put(actions.setFormSelectable(selectable))
              .put(actions.setFormClickable(clickable))
              .put(actions.setEndpoint(endpoint))
              .put(actions.setSearchEndpoint(searchEndpoint))
              .put(actions.setConstriction(constriction))
              .run()
          })

          test('should not load formDefinition if already loaded', () => {
            const formDefinition = [{someContent: true}]
            const formName = 'UserSearch'
            return expectSaga(sagas.loadFormDefinition, formDefinition, formName)
              .provide([
                [matchers.call.fn(sagas.setSorting)],
                [matchers.call.fn(getSelectable), false],
                [matchers.call.fn(getClickable), false],
                [matchers.call.fn(getEndpoint), null],
                [matchers.call.fn(getSearchEndpoint), null],
                [matchers.call.fn(getConstriction), null]
              ])
              .not.call(rest.fetchForm, formName, 'list')
              .run()
          })
        })

        describe('loadEntityModel saga', () => {
          test('should load the entity model if not loaded', () => {
            const entityName = 'User'
            const entityModel = {}

            const model = {name: 'User'}

            const gen = sagas.loadEntityModel(entityName, entityModel)
            expect(gen.next().value).to.eql(call(rest.fetchModel, entityName))
            expect(gen.next(model).value).to.eql(put(actions.setEntityModel(model)))

            expect(gen.next().done).to.be.true
          })

          test('should not load the entity model if already loaded', () => {
            const entityName = 'User'
            const entityModel = {
              name: 'User'
            }

            const gen = sagas.loadEntityModel(entityName, entityModel)
            expect(gen.next().done).to.be.true
          })
        })

        describe('onRowClick saga', () => {
          test('should not change selection if selectOnRowClick not true', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: false}).value)
              .to.eql(put(externalEvents.fireExternalEvent('onRowClick', {id: '1'})))
            expect(gen.next().done).to.be.true
          })

          test('should select a deselected row on click', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: true}).value).to.eql(select(sagas.selectionSelector))
            expect(gen.next({selection: ['2']}).value)
              .to.eql(put(selectionActions.onSelectChange(['1'], true)))
            expect(gen.next().value)
              .to.eql(put(externalEvents.fireExternalEvent('onRowClick', {id: '1'})))
            expect(gen.next().done).to.be.true
          })

          test('should deselect a selected row on click', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: true}).value).to.eql(select(sagas.selectionSelector))
            expect(gen.next({selection: ['1']}).value)
              .to.eql(put(selectionActions.onSelectChange(['1'], false)))
            expect(gen.next().value)
              .to.eql(put(externalEvents.fireExternalEvent('onRowClick', {id: '1'})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('prepareEndpointUrl', () => {
          test('should replace parentKey if parent exists', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([
                [select(sagas.entityListSelector), entityList]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should remove parentKey placeholder if parent is undefined', () => {
            const entityList = {parent: null}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User//test' // REST API doesn't care about duplicate slash

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([
                [select(sagas.entityListSelector), entityList]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should use search endpoint if defined and has user search input', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test/searchresults'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test/searchresults'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, true)
              .provide([
                [select(sagas.entityListSelector), entityList]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should use regular endpoint if search endpoint not defined and has user search input', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = undefined
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, true)
              .provide([
                [select(sagas.entityListSelector), entityList]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should use regular endpoint if search endpoint defined and does not have user search input', () => {
            const entityList = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const searchEndpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test/searchresults'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint, searchEndpoint, false)
              .provide([
                [select(sagas.entityListSelector), entityList]
              ])
              .returns(expectedResult)
              .run()
          })
        })

        describe('getBasicQuery', () => {
          test('should return an object with correct attributes', () => {
            const input = {searchFilters: ['filter1', 'filter2'], tql: 'foo == "bar"'}
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
              where: '(foo == "bar") and (relParent.pk == 1 and relGender.pk == 3 and txtFulltext ~= "full")',
              hasUserChanges: true
            }

            return expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.inputSelector), input],
                [select(sagas.searchFormSelector), searchForm],
                [select(sagas.selectionSelector), selection],
                [select(sagas.listSelector), {}],
                [matchers.call.fn(getSearchFormValues), searchFormValues]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return an object with hasUserChanges `false` if has only input attributes', () => {
            const input = {searchFilters: ['filter1', 'filter2'], tql: 'foo == "bar"'}
            const searchForm = {
              formFieldsFlat: {
                relGender: 'single-remote-field'
              }
            }
            const selection = {
              showSelectedRecords: false
            }
            const searchFormValues = {
            }

            const expectedResult = {
              filter: ['filter1', 'filter2'],
              where: '(foo == "bar")',
              hasUserChanges: false
            }

            return expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.inputSelector), input],
                [select(sagas.searchFormSelector), searchForm],
                [select(sagas.selectionSelector), selection],
                [select(sagas.listSelector), {}],
                [matchers.call.fn(getSearchFormValues), searchFormValues]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return tql if show selected is true', async() => {
            const selection = {
              showSelectedRecords: true,
              selection: ['1', '22', '99']
            }

            const saga = await expectSaga(sagas.getBasicQuery, true)
              .provide([
                [select(sagas.selectionSelector), selection],
                [select(sagas.inputSelector), {}]
              ])
              .run()

            expect(saga.returnValue).to.have.property('keys')
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
              .provide([
                [select(sagas.inputSelector), {navigationStrategy}]
              ])
              .call(navigationStrategy.navigateToCreateRelative, payload.relationName)
              .run()
          })
        })

        describe('loadDisplayExpressions saga', () => {
          test('should call rest helper with right params and call action to set lazy data', () => {
            const formName = 'User'
            const paths = ['display1', 'display2']
            const entities = [{__key: '23'}, {__key: '24'}]

            const fakeResult = {formName, displayExpressions: []}

            return expectSaga(sagas.loadDisplayExpressions, formName, paths, entities)
              .provide([
                [matchers.call.fn(rest.fetchDisplayExpressions), fakeResult]
              ])
              .call(rest.fetchDisplayExpressions, formName, 'list', ['23', '24'], paths)
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
              .provide([
                [select(sagas.inputSelector), {navigationStrategy}]
              ])
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

          const expectReload = (listState, remoteEvent) => expectSaga(sagas.remoteEvent, remoteEvent)
            .provide([
              [select(sagas.listSelector), listState]
            ])
            .call(sagas.reloadData)
            .run()

          const expectNoReload = listState => expectSaga(sagas.remoteEvent, createEventAction)
            .provide([
              [select(sagas.listSelector), listState]
            ])
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
              .provide([
                [select(sagas.listSelector), listState]
              ])
              .put(selectionActions.onSelectChange(['1', '99'], false))
              .run()
          })
        })

        describe('queryChanged saga', () => {
          test('should set query and call external event onSearchChange', () => {
            const query = {tql: 'firstname == "Max"'}

            return expectSaga(sagas.queryChanged)
              .provide([
                [call(sagas.getBasicQuery), query]
              ])
              .put(selectionActions.setQuery(query))
              .put(externalEvents.fireExternalEvent('onSearchChange', {query}))
              .run()
          })
        })
      })
    })
  })
})
