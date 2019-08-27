import {form} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  actions as formActions
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {put, select, call, fork, takeLatest, all} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import {validateSearchFields} from '../../util/searchFormValidation'
import {fetchForm, getEndpoint} from '../../util/api/forms'
import {setInitialized} from '../entityList/actions'
import {setFormDefinition} from '../list/actions'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
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
          test('should set initial form values (preselected and form definition)',
            () => {
              const searchFormVisible = true
              const FORM_ID = 'searchForm'
              const entityModel = {model: {fields: [{fieldName: 'firstname', type: 'string'}]}}
              const preselectedSearchFields = [{id: 'first.name', value: 'test'}]
              const formDefinition = {children: []}
              const fieldDefinitions = [
                {id: 'first.name', type: 'string'},
                {id: 'defaultTest', type: 'string', defaultValue: 'default'}
              ]
              const expectedValues = {'first--name': 'test', 'defaultTest': 'default'}

              return expectSaga(sagas.setInitialFormValues, searchFormVisible, formDefinition)
                .provide([
                  [select(sagas.inputSelector), {preselectedSearchFields}],
                  [matchers.call.fn(sagas.getEntityModel), entityModel],
                  [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions]
                ])
                .put(formActions.initialize(FORM_ID, expectedValues))
                .put(actions.setValuesInitialized(true))
                .run()
            }
          )

          test('should set parent relation by default',
            () => {
              const FORM_ID = 'searchForm'
              const parent = {key: '22', reverseRelationName: 'relWhatever'}
              const expectedValues = {relWhatever: {key: '22'}}

              return expectSaga(sagas.setInitialFormValues, false, null)
                .provide([
                  [select(sagas.inputSelector), {parent}],
                  [matchers.call.fn(sagas.getListFormDefinition), null],
                  [matchers.call.fn(getEndpoint), null]
                ])
                .put(formActions.initialize(FORM_ID, expectedValues))
                .run()
            }
          )

          test('should set parent relation if custom endpoint is defined',
            () => {
              const searchFormVisible = true
              const FORM_ID = 'searchForm'
              const parent = {key: '22', reverseRelationName: 'relWhatever'}
              const formDefinition = {children: []}
              const expectedValues = {}

              return expectSaga(sagas.setInitialFormValues, searchFormVisible, formDefinition)
                .provide([
                  [select(sagas.inputSelector), {parent}],
                  [matchers.call.fn(sagas.getListFormDefinition), null],
                  [matchers.call.fn(getEndpoint), '/custom/']
                ])
                .put(formActions.initialize(FORM_ID, expectedValues))
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
              'relGender': '1',
              'nameto--transform': 'test',
              'emptyArray': []
            }

            const expectedReturn = {
              'relGender': '1',
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

        describe('getListFormDefinition saga', () => {
          test('should return the ist form definition as soon as loaded', () => {
            const formDefinition = {table: {}}
            return expectSaga(sagas.getListFormDefinition)
              .provide([
                [select(sagas.listFromDefinitionSelector), null]
              ])
              .dispatch(setFormDefinition(formDefinition))
              .returns(formDefinition)
              .run()
          })
        })
      })
    })
  })
})
