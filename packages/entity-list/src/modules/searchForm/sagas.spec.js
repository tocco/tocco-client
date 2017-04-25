import {delay} from 'redux-saga'
import {put, select, call, fork, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

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
              fork(takeLatest, actions.RESET, sagas.setSearchTerm)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should set model and from definition and retrieve relevant entities', () => {
            const formBase = 'UserSearch'
            const searchInputs = {}
            const formDefinition = []

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
            expect(gen.next({formDefinition, searchInputs}).value).to.eql(select(sagas.inputSelector))

            expect(gen.next({formBase}).value).to.eql(call(sagas.getEntityModel))

            expect(gen.next(entityModel).value).to.eql(call(sagas.loadSearchForm, formDefinition, formBase))
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
      })
    })
  })
})
