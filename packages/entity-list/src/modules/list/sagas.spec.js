import {expectSaga} from 'redux-saga-test-plan'
import {actions as actionUtil, externalEvents, rest} from 'tocco-app-extensions'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as selectionActions from '../selection/actions'
import rootSaga, * as sagas from './sagas'
import {fetchForm, getSorting, getSelectable, getFields, getEndpoint} from '../../util/api/forms'
import {fetchModel} from '../../util/api/entities'
import {getSearchFormValues} from '../searchForm/sagas'

import {put, select, call, fork, spawn, takeLatest, takeEvery, all} from 'redux-saga/effects'

const generateState = (entityStore = {}, page) => ({
  initialized: false,
  formBase: '',
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
              fork(takeEvery, actions.SET_SORTING, sagas.setSorting),
              fork(takeEvery, actions.RESET_DATA_SET, sagas.loadData, 1),
              fork(takeLatest, actions.REFRESH, sagas.loadData),
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
            const formBase = 'Base_form'
            const formDefinition = null
            const entityModel = {}
            const initialized = false

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.entityListSelector))
            expect(gen.next({entityName}).value).to.eql(select(sagas.inputSelector))
            expect(gen.next({formBase}).value).to.eql(select(sagas.listSelector))
            const nextValue = gen.next({formDefinition, entityModel, initialized}).value
            expect(nextValue).to.eql(all([
              call(sagas.loadEntityModel, entityName, entityModel),
              call(sagas.loadFormDefinition, formDefinition, formBase)
            ]))

            expect(gen.next().value).to.eql(call(sagas.loadData, 1))
            expect(gen.next().value).to.eql(call(sagas.queryChanged))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().value).to.eql(put(actions.setInitialized()))
            expect(gen.next().done).to.be.true
          })

          test('should refresh the current page if already initialized', () => {
            const entityName = 'Test_entity'
            const formBase = 'Base_form'
            const columnDefinition = []
            const entityModel = {}
            const initialized = true

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.entityListSelector))
            expect(gen.next({entityName}).value).to.eql(select(sagas.inputSelector))
            expect(gen.next({formBase}).value).to.eql(select(sagas.listSelector))
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

        describe('setSorting saga', () => {
          test('should call reset data if list is initialized', () => {
            const initialized = true
            const gen = sagas.setSorting()
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next({initialized}).value).to.eql(call(sagas.loadData, 1))
            expect(gen.next().done).to.be.true
          })

          test('should not call reset data if list isnt initialized', () => {
            const initialized = false
            const gen = sagas.setSorting()
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next({initialized}).done).to.be.true
          })
        })

        describe('fetchEntitiesAndAddToStore saga', () => {
          test('should not add entities to store if already in it', () => {
            const entityName = 'User'
            const formBase = 'UserForm'
            const entityStore = {1: {}}

            const gen = sagas.fetchEntitiesAndAddToStore(1)
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({entityName, formBase}).value).to.eql(select(sagas.listSelector))
            expect(gen.next({entityStore}).done).to.be.true
          })

          test('should add entities to store', () => {
            const listViewState = generateState({}, 1)
            const input = {formBase: 'Base_form', entityName: 'User', searchFilters: []}
            const entities = []
            const fields = ['firstname', 'lastname']

            const page = 1

            return expectSaga(sagas.fetchEntitiesAndAddToStore, page)
              .provide([
                [select(sagas.inputSelector), input],
                [select(sagas.listSelector), listViewState],
                [matchers.call.fn(getFields), fields],
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(sagas.getBasicQuery), {}]
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
            expect(gen.next().value).to.eql(spawn(sagas.fetchEntitiesAndAddToStore, page + 1))
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

        describe('loadData saga', () => {
          test('should request entities for current page and recount forked', () => {
            const currentPage = 33
            const entities = [{}]
            const state = {currentPage}

            const gen = sagas.loadData()
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(fork(sagas.countEntities))
            expect(gen.next(state).value).to.eql(put(actions.clearEntityStore(entities)))
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next(state).value).to.eql(call(sagas.requestEntities, currentPage))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })

          test('should load data of provided page', () => {
            const requestedPage = 223
            const entities = [{}]

            const gen = sagas.loadData(requestedPage)
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(fork(sagas.countEntities))
            expect(gen.next().value).to.eql(put(actions.clearEntityStore(entities)))
            expect(gen.next().value).to.eql(put(actions.setCurrentPage(requestedPage)))
            expect(gen.next().value).to.eql(call(sagas.requestEntities, requestedPage))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('countEntities saga', () => {
          test('should refresh current page', () => {
            const formBase = 'User'
            const entityName = 'User'
            const fetchOptions = {}
            const entityCount = 100
            const searchFilters = []
            const endpoint = null

            const input = {entityName, searchFilters, formBase}
            return expectSaga(sagas.countEntities)
              .provide([
                [select(sagas.inputSelector), {endpoint}],
                [select(sagas.listSelector), input],
                [matchers.call.fn(sagas.getBasicQuery), fetchOptions],
                [matchers.call.fn(rest.fetchEntityCount), entityCount]
              ])
              .put(actions.setEntityCount(entityCount))
              .run()
          })
        })

        describe('loadTableDefinition saga', () => {
          test('should load Columndefinition if not loaded', () => {
            const formDefinition = null
            const formBase = 'UserSearch'
            const loadedFormDefinition = {
              children: []
            }
            const sorting = [{field: 'firstname', order: 'adsc'}]
            const selectable = true
            const endpoint = null

            const gen = sagas.loadFormDefinition(formDefinition, formBase)
            expect(gen.next().value).to.eql(call(fetchForm, `${formBase}_list`))
            expect(gen.next(loadedFormDefinition).value).to.eql(put(actions.setFormDefinition(loadedFormDefinition)))
            expect(gen.next().value).to.eql(call(getSorting, loadedFormDefinition))
            expect(gen.next(sorting).value).to.eql(put(actions.setSorting(sorting)))
            expect(gen.next().value).to.eql(call(getSelectable, loadedFormDefinition))
            expect(gen.next(selectable).value).to.eql(put(actions.setFormSelectable(selectable)))
            expect(gen.next().value).to.eql(call(getEndpoint, loadedFormDefinition))
            expect(gen.next(endpoint).value).to.eql(put(actions.setEndpoint(endpoint)))
            expect(gen.next().done).to.be.true
          })

          test('should not load Columndefinition if already loaded', () => {
            const columnDefinition = [{someContent: true}]
            const formBase = 'UserSearch'
            const gen = sagas.loadFormDefinition(columnDefinition, formBase)
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadEntityModel saga', () => {
          test('should load the entity model if not loaded', () => {
            const entityName = 'User'
            const entityModel = {}

            const loadedModel = {
              model: {name: 'User'},
              createPermission: false
            }

            const gen = sagas.loadEntityModel(entityName, entityModel)
            expect(gen.next().value).to.eql(call(fetchModel, entityName))
            expect(gen.next(loadedModel).value).to.eql(put(actions.setEntityModel(loadedModel.model)))
            expect(gen.next().value).to.eql(put(actions.setCreatePermission(loadedModel.createPermission)))

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
            expect(gen.next({selectOnRowClick: true}).value).to.eql(select(sagas.listSelector))
            expect(gen.next({selection: ['2']}).value)
              .to.eql(put(selectionActions.onSelectChange(['1'], true)))
            expect(gen.next().value)
              .to.eql(put(externalEvents.fireExternalEvent('onRowClick', {id: '1'})))
            expect(gen.next().done).to.be.true
          })

          test('should deselect a selected row on click', () => {
            const gen = sagas.onRowClick(actions.onRowClick('1'))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({selectOnRowClick: true}).value).to.eql(select(sagas.listSelector))
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
            const endpoint = 'nice2/rest/entities/User/{parentKey}/test'
            const expectedResult = 'nice2/rest/entities/User/123/test'

            return expectSaga(sagas.prepareEndpointUrl, endpoint)
              .provide([
                [select(sagas.inputSelector), input]
              ])
              .returns(expectedResult)
              .run()
          })

          test('should return endpoint as it is if parent is undefined', () => {
            const input = {parent: null}
            const endpoint = 'nice2/rest/entities/User/{parentKey}/test'

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
            const input = {formBase: 'User', searchFilters: ['filter1', 'filter2']}
            const searchForm = {
              formFieldsFlat: {
                'relGender': 'single-remote-field'
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
              filters: ['filter1', 'filter2', 'filter3'],
              form: 'User_list',
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

            const saga = await expectSaga(sagas.getBasicQuery)
              .provide([
                [select(sagas.selectionSelector), selection]
              ])
              .run()

            expect(saga.returnValue).to.have.property('tql')
          })
        })
      })
    })
  })
})
