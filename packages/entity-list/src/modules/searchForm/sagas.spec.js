import {put, select, call, fork, takeLatest, all, take} from 'redux-saga/effects'
import {form} from 'tocco-util'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  fetchEntities,
  searchFilterTransformer
} from '../../util/api/entities'
import {
  actions as formActions
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {validateSearchFields} from '../../util/searchFormValidation'
import {getSearchInputsForRequest} from '../../util/searchInputs'
import {fetchForm} from '../../util/api/forms'
import {setInitialized} from '../entityList/actions'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.LOAD_SEARCH_FILTERS, sagas.loadSearchFilters),
              fork(takeLatest, formActionTypes.CHANGE, sagas.submitSearchFrom),
              fork(takeLatest, actions.SUBMIT_SEARCH_FORM, sagas.submitSearchFrom),
              fork(takeLatest, actions.RESET_SEARCH, sagas.resetSearch),
              fork(takeLatest, actions.ADVANCED_SEARCH_UPDATE, sagas.advancedSearchUpdate)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should load form, initialvalues and set initialized status', () => {
            const formDefinition = []
            const searchFormName = 'SearchForm'
            const initialized = false
            const showSearchForm = true
            const gen = sagas.initialize(actions.initialize(showSearchForm))

            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({searchFormName, initialized}).value).to.eql(call(sagas.loadSearchForm, searchFormName))
            expect(gen.next(
              formDefinition).value).to.eql(call(sagas.setInitialFormValues, showSearchForm, formDefinition)
            )
            expect(gen.next().value).to.eql(put(actions.setInitialized()))
            expect(gen.next().done).to.be.true
          })
        })

        describe('setInitialFormValues saga', () => {
          it('should set initital form values (preselected and form definition)', () => {
            const searchFormVisible = true
            const FORM_ID = 'searchForm'
            const entityModel = {model: {fields: [{'fieldName': 'firstname', 'type': 'string'}]}}
            const preselectedSearchFields = [{id: 'first.name', value: 'test'}]
            const formDefinition = {children: []}
            const fieldDefinitions = [
              {'id': 'first.name', 'type': 'string'},
              {'id': 'defaultTest', type: 'string', defaultValue: 'default'}
            ]
            const values = {'first--name': 'test', 'defaultTest': 'default'}

            return expectSaga(sagas.setInitialFormValues, searchFormVisible, formDefinition)
              .provide([
                [select(sagas.inputSelector), {preselectedSearchFields}],
                [matchers.call.fn(sagas.getEntityModel), entityModel],
                [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions]
              ])
              .put(formActions.initialize(FORM_ID, values))
              .put(actions.setValuesInitialized(true))
              .run()
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

        describe('loadSearchForm saga', () => {
          it('should load the form definition and dispatch setFormDefintion', () => {
            const formDefinition = {children: []}

            return expectSaga(sagas.loadSearchForm)
              .provide([
                [matchers.call.fn(fetchForm), formDefinition]
              ])
              .put(actions.setFormDefinition(formDefinition))
              .returns(formDefinition)
              .run()
          })

          it('should set fulltext searchform if form does not exists', () => {
            const formDefinition = null

            return expectSaga(sagas.loadSearchForm)
              .provide([
                [matchers.call.fn(fetchForm), formDefinition]
              ])
              .not.put(actions.setFormDefinition(formDefinition))
              .put(actions.setShowFullTextSearchForm(true))
              .run()
          })
        })

        describe('getEntityModel saga', () => {
          it('should return the entity model as soon as initialized', () => {
            const entityModel = {fields: []}
            return expectSaga(sagas.getEntityModel)
              .provide([
                [select(sagas.entityListSelector), {initialized: false, entityModel}]
              ])
              .dispatch(setInitialized())
              .returns(entityModel)
              .run()
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

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchForm: {}}],
                [matchers.call.fn(fetchEntities), json],
                [matchers.call.fn(searchFilterTransformer), entities]
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

            return expectSaga(sagas.loadSearchFilters, args)
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

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchForm: {}}],
                [matchers.call.fn(fetchEntities), json],
                [matchers.call.fn(searchFilterTransformer), entities]
              ])
              .put(actions.setSearchFilter(entities))
              .run()
          })
        })
      })
    })
  })
})
