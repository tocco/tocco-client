import {put, select, call, fork, spawn, takeLatest, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import rootSaga, * as sagas from './sagas'
import {getSearchInputsForRequest} from '../../util/searchInputs'
import {fetchForm, columnDefinitionTransformer} from '../../util/api/forms'
import {fetchEntityCount, fetchEntities, entitiesListTransformer} from '../../util/api/entities'
import _clone from 'lodash/clone'

const generateState = (entityStore = {}, page) => ({
  formBase: '',
  orderBy: '',
  limit: '',
  entityStore,
  columnDefinition: [],
  page
})

describe('entity-list', () => {
  describe('modules', () => {
    describe('list', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.CHANGE_PAGE, sagas.changePage),
              fork(takeLatest, searchFormActions.SEARCH_TERM_CHANGE, sagas.resetDataSet),
              fork(takeEvery, actions.SET_ORDER_BY, sagas.resetDataSet),
              fork(takeEvery, actions.RESET_DATA_SET, sagas.resetDataSet),
              fork(takeLatest, actions.REFRESH, sagas.refresh)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          it('should initialize the list', () => {
            const formBase = 'Base_form'
            const columnDefinition = []

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(put(searchFormActions.initialize()))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({formBase}).value).to.eql(select(sagas.listSelector))
            expect(gen.next({columnDefinition}).value)
              .to.eql(call(sagas.loadColumnDefinition, columnDefinition, formBase))
            expect(gen.next().value).to.eql(call(sagas.resetDataSet))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('changePage saga', () => {
          it('should set currentPage and requestEntities', () => {
            const page = 1
            const gen = sagas.changePage({payload: {page: page}})
            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(put(actions.setCurrentPage(page)))
            expect(gen.next().value).to.eql(call(sagas.requestEntities, page))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('fetchEntitiesAndAddToStore saga', () => {
          it('should not add entities to store if already in it', () => {
            const entityName = 'User'
            const formBase = 'UserForm'
            const entityStore = {1: {}}

            const gen = sagas.fetchEntitiesAndAddToStore(1)
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({entityName, formBase}).value).to.eql(select(sagas.listSelector))
            expect(gen.next({entityStore}).done).to.be.true
          })

          it('should add entities to store', () => {
            const listViewState = generateState({}, 1)
            const input = {formBase: 'Base_form', entityName: 'User', searchFilters: []}
            const formName = input.formBase + '_list'
            const searchInputs = {}
            const entities = []

            const {page, orderBy, limit, columnDefinition} = listViewState
            const fetchParams = {
              page,
              orderBy,
              limit,
              fields: columnDefinition,
              searchInputs,
              formName,
              searchFilters: []
            }

            const gen = sagas.fetchEntitiesAndAddToStore(1)
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next(input).value).to.eql(select(sagas.listSelector))
            expect(gen.next(listViewState).value).to.eql(call(sagas.getSearchInputs))
            expect(gen.next(searchInputs).value).to.eql(
              call(fetchEntities, input.entityName, fetchParams, entitiesListTransformer)
            )
            expect(gen.next(entities).value).to.eql(put(actions.addEntitiesToStore(page, entities)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('requestEntities saga', () => {
          it('should request entities', () => {
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

          it('should not cache if at end', () => {
            const page = 1
            const gen = sagas.requestEntities(page)

            const state = generateState({}, page)
            state.limit = 50
            state.entityCount = 49

            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next(state).value).to.eql(call(sagas.fetchEntitiesAndAddToStore, page))
            expect(gen.next().value).to.eql(call(sagas.displayEntity, page))

            expect(gen.next().done).to.be.true
          })
        })

        describe('displayEntity saga', () => {
          it('should display entity', () => {
            const page = 1
            const gen = sagas.displayEntity(page)
            const entities = [{}]
            const state = generateState({1: entities})
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next(state).value).to.eql(put(actions.setEntities(entities)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('resetDataSet saga', () => {
          it('should clear the entity store', () => {
            const gen = sagas.resetDataSet()

            const formBase = 'User'
            const entityName = 'User'
            const searchInputs = {}
            const entityCount = 100
            const searchFilters = []
            const formName = 'User_list'
            const fetchParams = {
              searchInputs,
              formName,
              searchFilters: []
            }

            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({entityName, searchFilters, formBase}).value).to.eql(call(sagas.getSearchInputs))
            expect(gen.next(searchInputs).value).to.eql(call(fetchEntityCount, entityName, fetchParams))
            expect(gen.next(entityCount).value).to.eql(put(actions.setEntityCount(entityCount)))
            expect(gen.next().value).to.eql(put(actions.clearEntityStore()))
            expect(gen.next().value).to.eql(call(sagas.changePage, {payload: {page: 1}}))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('refresh saga', () => {
          it('should refresh current page', () => {
            const page = 33
            const gen = sagas.refresh()
            const entities = [{}]
            const state = {currentPage: page}

            expect(gen.next().value).to.eql(put(actions.setInProgress(true)))
            expect(gen.next().value).to.eql(select(sagas.listSelector))
            expect(gen.next(state).value).to.eql(put(actions.clearEntityStore(entities)))
            expect(gen.next(state).value).to.eql(call(sagas.requestEntities, page))
            expect(gen.next().value).to.eql(put(actions.setInProgress(false)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('getSearchInputs saga', () => {
          it('should get searchInputs', () => {
            const searchInputs = {}
            const entityModel = {}

            const gen = sagas.getSearchInputs()
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({searchInputs}).value).to.eql(call(_clone, {}))
            expect(gen.next(searchInputs).value).to.eql(call(sagas.getEntityModel))
            expect(gen.next(entityModel).value).to.eql(call(getSearchInputsForRequest, searchInputs, entityModel))
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadColumnDefinition saga', () => {
          it('should load Columndefinition if not loaded', () => {
            const columnDefinition = []
            const formBase = 'UserSearch'
            const loadedColumnDefintion = []
            const gen = sagas.loadColumnDefinition(columnDefinition, formBase)
            expect(gen.next().value).to.eql(call(fetchForm, `${formBase}_list`, columnDefinitionTransformer))
            expect(gen.next(loadedColumnDefintion).value).to.eql(put(actions.setColumnDefinition(columnDefinition)))

            expect(gen.next().done).to.be.true
          })

          it('should not load Columndefinition if already loaded', () => {
            const columnDefinition = [{someContent: true}]
            const formBase = 'UserSearch'
            const gen = sagas.loadColumnDefinition(columnDefinition, formBase)
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
