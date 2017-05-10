import {delay} from 'redux-saga'
import {put, select, call, fork, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {fetchEntities, selectEntitiesTransformer} from '../../util/api/entities'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.SET_SEARCH_INPUT, sagas.setSearchTerm),
              fork(takeLatest, actions.RESET, sagas.setSearchTerm),
              fork(takeLatest, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should set model and from definition and retrieve relevant entities', () => {
            const searchInputs = {}
            const formDefinition = []
            const searchFormName = 'SearchForm'

            const entityModel = {
              test1: {
                targetEntity: 'testEntity1'
              },
              test2: {
                targetEntity: 'testEntity2'
              }
            }

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({formDefinition, searchInputs, searchFormName}).value).to.eql(call(sagas.getEntityModel))
            expect(gen.next(entityModel).value).to.eql(call(sagas.loadSearchForm, formDefinition, searchFormName))
            expect(gen.next(formDefinition).value)
              .to.eql(call(sagas.loadPreselectedRelationEntities, formDefinition, entityModel, searchInputs))
            expect(gen.next().done).to.be.true
          })
        })

        describe('setSearchTerm saga', () => {
          it('should notify with delay (debounce)', () => {
            const gen = sagas.setSearchTerm()
            const searchValues = {}

            expect(gen.next().value).to.eql(call(delay, 400))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({searchValues}).value).to.eql(put(actions.searchTermChange({})))
          })
        })

        describe('loadRelationEntity saga', () => {
          it('should load relation entites ', () => {
            const entityName = 'User'

            const entities = [{display: 'User1', key: 1}]
            const transformedEntities = [{key: 1, display: 'User1'}]
            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({relationEntities:{}}).value)
              .to.eql(call(fetchEntities, entityName, {}, selectEntitiesTransformer))
            expect(gen.next(entities).value)
              .to.eql(put(actions.setRelationEntity(entityName, transformedEntities, true)))
            expect(gen.next().value).to.eql(put(actions.setRelationEntityLoaded(entityName)))
            expect(gen.next().done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const state = {
              relationEntities: {
                User: {
                  loaded:true
                }
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next(state).done).to.be.true
          })
        })
      })
    })
  })
})
