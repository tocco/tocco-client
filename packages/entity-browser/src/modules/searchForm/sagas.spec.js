import {takeLatest, delay} from 'redux-saga'
import {put, select, call, fork} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import * as api from '../../util/api'

describe('entity-browser', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.SET_FORM, sagas.initializeSearchForm),
              fork(takeLatest, actions.SET_SEARCH_INPUT, sagas.setSearchTerm),
              fork(takeLatest, actions.RESET, sagas.setSearchTerm)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should set model and from definition and  retrieve relevant entities', () => {
            const entityName = 'User'
            const formName = 'UserSearch'

            const gen = sagas.initializeSearchForm({payload: {formName, entityName}})

            expect(gen.next().value).to.eql([
              call(api.fetchSearchForm, formName),
              call(api.fetchModel, entityName)
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
              call(api.fetchRelationRecords, 'testEntity1'),
              call(api.fetchRelationRecords, 'testEntity2')
            ])

            expect(gen.next({}).value).to.eql(call(api.transformRelationEntitiesResults, {}))
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

