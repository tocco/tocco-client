import {delay} from 'redux-saga'
import {put, select, call, fork, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
import {fetchModel, combineEntitiesInObject, fetchEntities} from '../../util/api/entities'

describe('entity-browser', () => {
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
            const entityName = 'User'
            const formBase = 'UserSearch'

            const gen = sagas.initialize({payload: {entityName, formBase}})

            expect(gen.next().value).to.eql([
              call(fetchForm, formBase + '_search', searchFormTransformer),
              call(fetchModel, entityName)
            ])

            const formDefinition = [
              {
                name: 'test1',
                type: 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox'
              },
              {
                name: 'test2',
                type: 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox'
              }
            ]

            const entityModel = {
              test1: {
                targetEntity: 'testEntity1'
              },
              test2: {
                targetEntity: 'testEntity2'
              }
            }

            expect(gen.next([formDefinition, entityModel]).value).to.eql(put(actions.setEntityModel(entityModel)))
            expect(gen.next().value).to.eql(put(actions.setFormDefinition(formDefinition)))

            expect(gen.next().value).to.eql([
              call(fetchEntities, 'testEntity1'),
              call(fetchEntities, 'testEntity2')
            ])

            expect(gen.next({}).value).to.eql(call(combineEntitiesInObject, {}))
            expect(gen.next({}).value).to.eql(put(actions.setRelationEntities({})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('setSearchTerm saga', () => {
          it('should notify with delay (debounce)', () => {
            const gen = sagas.setSearchTerm()

            expect(gen.next().value).to.eql(call(delay, 400))
            expect(gen.next().value).to.eql(select(sagas.searchValuesSelector))
            expect(gen.next({}).value).to.eql(put(actions.searchTermChange({})))
          })
        })
      })
    })
  })
})

