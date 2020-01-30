import {expectSaga} from 'redux-saga-test-plan'
import {actions as actionUtil, externalEvents, rest} from 'tocco-app-extensions'
import * as matchers from 'redux-saga-test-plan/matchers'
import {put, select, call, fork, spawn, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {api} from 'tocco-util'

import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as selectionActions from '../selection/actions'
import rootSaga, * as sagas from './sagas'
import {getSorting, getSelectable, getFields, getEndpoint} from '../../util/api/forms'
import {getSearchFormValues} from '../searchForm/sagas'

const generateState = (entityStore = {}, page) => ({
  initialized: false,
  formName: '',
  sorting: null,
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
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.CHANGE_PAGE, sagas.changePage),
              fork(takeLatest, searchFormActions.EXECUTE_SEARCH, sagas.loadData, 1),
              fork(takeLatest, searchFormActions.EXECUTE_SEARCH, sagas.queryChanged),
              fork(takeEvery, actions.SET_SORTING, sagas.reloadData),
              fork(takeEvery, actions.RESET_DATA_SET, sagas.loadData, 1),
              fork(takeLatest, actions.REFRESH, sagas.loadData),
              fork(takeLatest, actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate),
              fork(takeLatest, selectionActions.RELOAD_DATA, sagas.loadData, 1),
              fork(takeLatest, actions.ON_ROW_CLICK, sagas.onRowClick),
              fork(takeEvery, actionUtil.actions.ACTION_INVOKED, sagas.actionInvoked)
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
          test('should extract sorting of form', () => {
            const sorting = [{field: 'firstname', order: 'asc'}]
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), sorting]
              ])
              .put(actions.setSorting(sorting))
              .run()
          })

          test('should set fallback if not defined in form', () => {
            return expectSaga(sagas.setSorting)
              .provide([
                [matchers.call.fn(getSorting), []]
              ])
              .put(actions.setSorting(sagas.FALLBACK_SORTING))
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
            const endpoint = 'customEndpoint'

            return expectSaga(sagas.loadFormDefinition, formDefinition, formName)
              .provide([
                [matchers.call.fn(rest.fetchForm), loadedFormDefinition],
                [matchers.call.fn(sagas.setSorting)],
                [matchers.call.fn(getSelectable), selectable],
                [matchers.call.fn(getEndpoint), endpoint]
              ])
              .call(rest.fetchForm, formName, 'list')
              .put(actions.setFormDefinition(loadedFormDefinition))
              .call(sagas.setSorting, loadedFormDefinition)
              .put(actions.setFormSelectable(selectable))
              .put(actions.setEndpoint(endpoint))
              .run()
          })

          test('should not load formDefinition if already loaded', () => {
            const formDefinition = [{someContent: true}]
            const formName = 'UserSearch'
            return expectSaga(sagas.loadFormDefinition, formDefinition, formName)
              .provide([
                [matchers.call.fn(sagas.setSorting)],
                [matchers.call.fn(getSelectable), false],
                [matchers.call.fn(getEndpoint), null]
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
            const input = {parent: {key: 123}}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/2.0/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([
                [select(sagas.inputSelector), input]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return endpoint as it is if parent is undefined', () => {
            const input = {parent: null}
            const endpoint = 'nice2/rest/entities/2.0/User/{parentKey}/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([
                [select(sagas.inputSelector), input]
              ])
              .returns(endpoint)
              .run()
          })
        })

        describe('getBasicQuery', () => {
          test('should return an object with correct attributes', () => {
            const input = {searchFilters: ['filter1', 'filter2']}
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
              search: 'full',
              conditions: {
                'relParent.pk': {value: '1'},
                'relGender.pk': {value: '3'}
              }
            }

            return expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.inputSelector), input],
                [select(sagas.searchFormSelector), searchForm],
                [select(sagas.selectionSelector), selection],
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

            expect(saga.returnValue).to.have.property('tql')
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
          test('should call external event onNavigateToCreate', () => {
            const payload = {
              relationName: 'relUser'
            }

            return expectSaga(sagas.navigateToCreate, {payload})
              .put(externalEvents.fireExternalEvent('onNavigateToCreate', payload.relationName))
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
      })
    })
  })
})
