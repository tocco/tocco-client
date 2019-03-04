import {form, rest} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  actions as formActions
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import {validateSearchFields} from '../../util/searchFormValidation'
import {fetchForm} from '../../util/api/forms'
import {setInitialized} from '../entityList/actions'

import {put, select, call, fork, takeLatest, all} from 'redux-saga/effects'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.LOAD_SEARCH_FILTERS, sagas.loadSearchFilters),
              fork(takeLatest, formActionTypes.CHANGE, sagas.submitSearchFrom),
              fork(takeLatest, actions.SUBMIT_SEARCH_FORM, sagas.submitSearchFrom),
              fork(takeLatest, actions.RESET_SEARCH, sagas.resetSearch)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          test('should load form, initialvalues and set initialized status', () => {
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
          test(
            'should set initital form values (preselected and form definition)',
            () => {
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
            }
          )
        })

        describe('submitSearchFrom saga', () => {
          test('should call executeSearch if no validation error occures', () => {
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

          test('should not call executeSearch if validation error occures', () => {
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

        describe('getSearchFormValues saga', () => {
          test('should return values of search form', () => {
            const searchValues = {
              relGender: '1',
              'nameto--transform': 'test',
              emptyArray: []
            }

            const expectedReturn = {
              relGender: '1',
              'nameto.transform': 'test'
            }

            return expectSaga(sagas.getSearchFormValues)
              .provide([
                [select(sagas.searchFormSelector), {valuesInitialized: true}],
                [select(sagas.searchValuesSelector), searchValues]
              ])
              .returns(expectedReturn)
              .run()
          })
        })

        describe('resetSearch saga', () => {
          test('should reset the form and trigger a search', () => {
            const gen = sagas.resetSearch()
            expect(gen.next().value).to.eql(put(formActions.reset('searchForm')))
            expect(gen.next().value).to.eql(call(sagas.submitSearchFrom))
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadSearchForm saga', () => {
          test('should load the form definition and dispatch setFormDefintion', () => {
            const formDefinition = {children: []}

            return expectSaga(sagas.loadSearchForm)
              .provide([
                [matchers.call.fn(fetchForm), formDefinition]
              ])
              .put(actions.setFormDefinition(formDefinition))
              .returns(formDefinition)
              .run()
          })

          test('should set fulltext searchform if form does not exists', () => {
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
          test('should return the entity model as soon as initialized', () => {
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
          test('should load search filters', () => {
            const args = {
              payload: {
                model: 'User',
                filters: []
              }
            }

            const entities = {
              display: 'Filter 1',
              key: 'filter1'
            }

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchForm: {}}],
                [matchers.call.fn(rest.fetchEntities), entities]
              ])
              .put(actions.setSearchFilter(entities))
              .run()
          })

          test('should not load search filters if already loaded', () => {
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

          test('should add filters passed in arguments', () => {
            const args = {
              payload: {
                model: 'User',
                filters: ['filter1']
              }
            }

            const entities = {
              display: 'Filter 1',
              key: 'filter1'
            }

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFormSelector), {searchForm: {}}],
                [matchers.call.fn(rest.fetchEntities), entities]
              ])
              .put(actions.setSearchFilter(entities))
              .run()
          })
        })
      })
    })
  })
})
