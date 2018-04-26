import {put, select, call, fork, takeLatest, all, take} from 'redux-saga/effects'
import {form} from 'tocco-util'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {fetchEntities, selectEntitiesTransformer, selectEntitiesPathsTransformer} from '../../util/api/entities'
import {
  actions as formActions
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {validateSearchFields} from '../../util/searchFormValidation'
import {getPreselectedValues} from '../../util/searchForm'
import {getSearchInputsForRequest} from '../../util/searchInputs'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity),
              fork(takeLatest, actions.LOAD_SEARCH_FILTERS, sagas.loadSearchFilters),
              fork(takeLatest, formActionTypes.CHANGE, sagas.submitSearchFrom),
              fork(takeLatest, actions.SUBMIT_SEARCH_FORM, sagas.submitSearchFrom),
              fork(takeLatest, actions.RESET_SEARCH, sagas.resetSearch)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should load form, initialvalues and set initialized status', () => {
            const formDefinition = []
            const searchFormName = 'SearchForm'
            const initialized = false

            const gen = sagas.initialize()

            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))

            expect(gen.next({searchFormName, initialized}).value).to.eql(call(sagas.loadSearchForm, searchFormName))
            expect(gen.next(formDefinition).value).to.eql(call(sagas.setInitialFormValues, formDefinition))
            expect(gen.next().value).to.eql(put(actions.setInitialized()))
            expect(gen.next().done).to.be.true
          })
        })

        describe('setInitialFormValues saga', () => {
          it('should set intital form values (preselected and form definition)', () => {
            const entityModel = {model: {fields: [{'fieldName': 'firstname', 'type': 'string'}]}}
            const preselectedSearchFields = [{id: 'firstname', value: 'test'}]
            const preselectedValues = {firstname: 'test'}
            const formDefinition = {children: []}
            const fieldDefinitions = [{'fieldName': 'firstname', 'type': 'string'}]
            const formDefaultValues = {firstname: 'Homer'}

            const gen = sagas.setInitialFormValues(formDefinition)

            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({preselectedSearchFields}).value).to.eql(call(sagas.getEntityModel))
            expect(gen.next(entityModel).value).to.eql(
              call(getPreselectedValues, preselectedSearchFields, entityModel.model, sagas.loadRelationEntity)
            )
            expect(gen.next(preselectedValues).value).to.eql(call(form.getFieldDefinitions, formDefinition))
            expect(gen.next(fieldDefinitions).value).to.eql(call(form.getDefaultValues, fieldDefinitions))
            expect(gen.next(formDefaultValues).value).to.eql(
              put(formActions.initialize('searchForm', {...formDefaultValues, ...preselectedValues}))
            )
            expect(gen.next().value).to.eql(put(actions.setValuesInitialized(true)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitSearchFrom saga', () => {
          it('should call executeSearch if no validation error occures', () => {
            const FORM_ID = 'searchForm'

            const values = {firstname: 'a'}
            const formDefinition = {}
            const gen = sagas.submitSearchFrom()
            expect(gen.next().value).to.eql(put(formActions.startSubmit(FORM_ID)))
            gen.next() // Function call not testable: expect(gen.next().value).to.eql(select(getFormValues(FORM_ID)))
            expect(gen.next(values).value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(validateSearchFields, values, formDefinition))
            const errors = {}
            expect(gen.next(errors).value).to.eql(put(formActions.stopSubmit(FORM_ID, errors)))
            expect(gen.next().value).to.eql(put(actions.executeSearch()))
            expect(gen.next().done).to.be.true
          })

          it('should not call executeSearch if validation error occures', () => {
            const FORM_ID = 'searchForm'

            const values = {firstname: 'a'}
            const formDefinition = {}
            const gen = sagas.submitSearchFrom()
            expect(gen.next().value).to.eql(put(formActions.startSubmit(FORM_ID)))
            gen.next() // Function call not testable: expect(gen.next().value).to.eql(select(getFormValues(FORM_ID)))
            expect(gen.next(values).value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(validateSearchFields, values, formDefinition))
            const errors = {firstname: {minLength: ['to short!']}}
            expect(gen.next(errors).value).to.eql(put(formActions.stopSubmit(FORM_ID, errors)))
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
              .to.eql(call(fetchEntities, entityName, {fields: ['pk'], limit: 100}, selectEntitiesTransformer))
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

        describe('getSearchInputs saga', () => {
          it('should get searchInputs', () => {
            const valuesInitialized = false
            const entityModel = {}
            const searchValues = {
              txtFulltext: 'txtFulltext',
              searchFilter: [{uniqueId: 'filter'}]
            }

            const renamedSearchValues = {
              _search: 'txtFulltext',
              _filter: ['filter']
            }

            const gen = sagas.getSearchInputs()
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({valuesInitialized}).value).to.eql(take(actions.SET_VALUES_INITIALIZED))
            expect(gen.next().value).to.eql(select(sagas.searchValuesSelector))
            expect(gen.next(searchValues).value).to.eql(select(sagas.entityListSelector))
            expect(gen.next({entityModel}).value).to.eql(
              call(getSearchInputsForRequest, renamedSearchValues, entityModel))
            expect(gen.next().done).to.be.true
          })
        })

        describe('resetSearch saga', () => {
          it('should reset the form and trigger a search', () => {
            const gen = sagas.resetSearch()
            expect(gen.next().value).to.eql(put(formActions.reset('searchForm')))
            expect(gen.next().value).to.eql(call(sagas.submitSearchFrom))
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadSearchFilters saga', () => {
          it('should load search filters', () => {
            const args = {
              payload: {
                model: 'User',
                filters: []
              }
            }

            const json = {
              data: [
                {
                  display: 'Filter 1',
                  paths: {
                    unique_id: {
                      value: {
                        value: 'filter1'
                      }
                    }
                  }
                }
              ]
            }

            const entities = {
              display: 'Filter 1',
              key: 'filter1'
            }

            expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchForm: {}}],
                [matchers.call.fn(fetchEntities), json],
                [matchers.call.fn(selectEntitiesPathsTransformer), entities]
              ])
              .put(actions.setSearchFilter(entities))
              .run()
          })

          it('should not load search filters if already loaded', () => {
            const args = {
              payload: {
                model: 'User',
                filters: []
              }
            }

            const existingSearchFilters = [{
              display: 'Filter 1',
              key: 'filter1'
            }]

            expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchFilter: existingSearchFilters}]
              ])
              .run()
          })

          it('should add filters passed in arguments', () => {
            const args = {
              payload: {
                model: 'User',
                filters: ['filter1']
              }
            }

            const json = {
              data: [
                {
                  display: 'Filter 1',
                  paths: {
                    unique_id: {
                      value: {
                        value: 'filter1'
                      }
                    }
                  }
                }
              ]
            }

            const entities = {
              display: 'Filter 1',
              key: 'filter1'
            }

            expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchForm: {}}],
                [matchers.call.fn(fetchEntities), json],
                [matchers.call.fn(selectEntitiesPathsTransformer), entities]
              ])
              .put(actions.setSearchFilter(entities))
              .run()
          })
        })
      })
    })
  })
})
