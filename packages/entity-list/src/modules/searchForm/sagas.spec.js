import {delay} from 'redux-saga'
import {put, select, call, fork, takeLatest, all} from 'redux-saga/effects'
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
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.SET_SEARCH_INPUT, sagas.setSearchTerm),
              fork(takeLatest, actions.RESET, sagas.setSearchTerm),
              fork(takeLatest, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should set model and from definition and set initial searchInputs', () => {
            const preselectedSearchFields = {}
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
            expect(gen.next({formDefinition, preselectedSearchFields, searchFormName}).value).to.eql(
              call(sagas.getEntityModel)
            )

            expect(gen.next(entityModel).value).to.eql(all([
              call(sagas.loadSearchForm, formDefinition, searchFormName),
              call(sagas.setInitialSearchInputs, entityModel, preselectedSearchFields)
            ])
            )
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

        describe('setInitialSearchInputs saga', () => {
          it('should set simple search values', () => {
            const entityModel = {}
            const preselectedSearchFields = [
              {
                id: 'fullText',
                value: 'test'
              },
              {
                id: 'field2',
                value: 'test2'
              }
            ]

            const gen = sagas.setInitialSearchInputs(entityModel, preselectedSearchFields)

            expect(gen.next().value).to.eql(put(actions.setSearchInput('fullText', 'test')))
            expect(gen.next().value).to.eql(put(actions.setSearchInput('field2', 'test2')))
            expect(gen.next().done).to.be.true
          })

          it('should set relation search values with display', () => {
            const entityModel = {relRelation: {type: 'relation', targetEntity: 'entity1'}}
            const entities = [{key: '2', display: 'test'}]
            const preselectedSearchFields = [
              {
                id: 'relRelation',
                value: '2'
              }
            ]

            const gen = sagas.setInitialSearchInputs(entityModel, preselectedSearchFields)

            expect(gen.next().value).to.eql(call(sagas.loadRelationEntity, actions.loadRelationEntity('entity1')))
            expect(gen.next(entities).value).to.eql(
              put(actions.setSearchInput('relRelation', {key: '2', display: 'test'}))
            )
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadRelationEntity saga', () => {
          it('should load relation entites and return them ', () => {
            const entityName = 'User'

            const entities = [{display: 'User1', key: 1}]
            const transformedEntities = [{key: 1, display: 'User1'}]
            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({relationEntities: {}}).value)
              .to.eql(call(fetchEntities, entityName, {}, selectEntitiesTransformer))
            expect(gen.next(entities).value)
              .to.eql(put(actions.setRelationEntity(entityName, transformedEntities, true)))
            expect(gen.next().value).to.eql(put(actions.setRelationEntityLoaded(entityName)))

            const next = gen.next()
            expect(next.value).to.eql(entities)
            expect(next.done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const relationEntities = {
              User: {
                data: [{name: 'entity1'}, {name: 'entity2'}],
                loaded: true
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))

            const next = gen.next({relationEntities})
            expect(next.value).to.eql(relationEntities.User.data)
            expect(next.done).to.be.true
          })
        })
      })
    })
  })
})
