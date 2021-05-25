import {form, rest, notifier} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  actions as formActions
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {put, select, call, takeLatest, all} from 'redux-saga/effects'
import {channel} from 'redux-saga'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import {validateSearchFields} from '../../util/searchFormValidation'
import {getEndpoint} from '../../util/api/forms'
import {setSearchFormType} from '../entityList/actions'
import {setFormDefinition, SET_ENTITY_MODEL} from '../list/actions'
import * as listSagas from '../list/sagas'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.INITIALIZE, sagas.initialize),
              takeLatest(formActionTypes.CHANGE, sagas.submitSearchFrom),
              takeLatest(actions.SUBMIT_SEARCH_FORM, sagas.submitSearchFrom),
              takeLatest(actions.RESET_SEARCH, sagas.resetSearch),
              takeLatest(actions.SAVE_SEARCH_FILTER, sagas.saveSearchFilter),
              takeLatest(actions.DELETE_SEARCH_FILTER, sagas.deleteSearchFilter),
              takeLatest(actions.SAVE_DEFAULT_SEARCH_FILTER, sagas.saveDefaultSearchFilter),
              takeLatest(actions.RESET_DEFAULT_SEARCH_FILTER, sagas.resetDefaultSearchFilter)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          test('should load form, initialvalues and set initialized status', () => {
            const formDefinition = []
            const entityName = 'User'
            const searchFormType = 'admin'

            const showSearchForm = true

            return expectSaga(sagas.initialize, actions.initialize(showSearchForm))
              .provide([
                [select(sagas.entityListSelector), {searchFormType, entityName}],
                [matchers.call.fn(sagas.loadSearchForm), formDefinition],
                [matchers.call.fn(sagas.setInitialFormValues)],
                [matchers.call.fn(sagas.loadSearchFilter)]
              ])
              .put(actions.setInitialized())
              .run()
          })
        })

        describe('setInitialFormValues saga', () => {
          test('should set initial form values (preselected and form definition)',
            () => {
              const searchFormVisible = true
              const FORM_ID = 'searchForm'
              const entityModel = {paths: [{fieldName: 'firstname', type: 'string'}]}
              const preselectedSearchFields = [{id: 'first.name', value: 'test'}]
              const formDefinition = {children: []}
              const fieldDefinitions = [
                {id: 'first.name', path: 'first.name', type: 'string'},
                {id: 'defaultTest', path: 'defaultTest', type: 'string', defaultValue: 'default'}
              ]
              const expectedValues = {'first--name': 'test', 'defaultTest': 'default'}

              return expectSaga(sagas.setInitialFormValues, searchFormVisible, formDefinition)
                .provide([
                  [select(sagas.entityListSelector), {}],
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
              const expectedValues = {relWhatever: {key: '22', display: 'Test User'}}

              return expectSaga(sagas.setInitialFormValues, false, null)
                .provide([
                  [select(sagas.entityListSelector), {parent}],
                  [select(sagas.inputSelector), {}],
                  [matchers.call.fn(sagas.getListFormDefinition), null],
                  [matchers.call.fn(getEndpoint), null],
                  [matchers.call.fn(rest.fetchDisplay), 'Test User']
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
                  [select(sagas.entityListSelector), {parent}],
                  [select(sagas.inputSelector), {}],
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
            const values = {firstname: 'a'}
            const formDefinition = {}
            const gen = sagas.submitSearchFrom()
            gen.next() // Function call not testable: expect(gen.next().value).to.eql(select(getFormValues(FORM_ID)))
            expect(gen.next(values).value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(validateSearchFields, values, formDefinition))
            const errors = {}
            expect(gen.next(errors).value).to.eql(put(actions.executeSearch()))
            expect(gen.next().done).to.be.true
          })

          test('should not call executeSearch if validation error occures', () => {
            const values = {firstname: 'a'}
            const formDefinition = {}
            const gen = sagas.submitSearchFrom()
            gen.next() // Function call not testable: expect(gen.next().value).to.eql(select(getFormValues(FORM_ID)))
            expect(gen.next(values).value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(validateSearchFields, values, formDefinition))
            const errors = {firstname: {minLength: ['to short!']}}
            expect(gen.next(errors).done).to.be.true
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
          test('should trigger submit to reload with default filters', () => (
            expectSaga(sagas.resetSearch)
              .provide([
                [matchers.call.fn(sagas.resetSearchFilters), undefined],
                [matchers.call.fn(sagas.submitSearchFrom), undefined]
              ])
              .put(formActions.reset('searchForm'))
              .call(sagas.resetSearchFilters)
              .call(sagas.submitSearchFrom)
              .run()
          ))
        })

        describe('loadSearchForm saga', () => {
          test('should load the form definition and dispatch setFormDefinition', () => {
            const formDefinition = {children: []}

            return expectSaga(sagas.loadSearchForm)
              .provide([
                [matchers.call.fn(rest.fetchForm), formDefinition],
                [select(sagas.entityListSelector), {searchFormType: 'basic'}],
                [select(sagas.inputSelector), {}]
              ])
              .put(actions.setFormDefinition(formDefinition))
              .returns(formDefinition)
              .run()
          })

          test('should set fulltext searchform if form does not exists', () => {
            const formDefinition = null

            return expectSaga(sagas.loadSearchForm)
              .provide([
                [matchers.call.fn(rest.fetchForm), formDefinition],
                [select(sagas.entityListSelector), {searchFormType: 'basic'}]
              ])
              .not.put(actions.setFormDefinition(formDefinition))
              .call(sagas.setSimpleForm)
              .put(setSearchFormType('simple'))
              .run()
          })

          test('should set simple form if type is simple', () => {
            return expectSaga(sagas.loadSearchForm)
              .provide([
                [select(sagas.entityListSelector), {searchFormType: 'simple'}]
              ])
              .call(sagas.setSimpleForm)
              .run()
          })
        })

        describe('getEntityModel saga', () => {
          test('should return the entity model as soon as initialized', () => {
            const entityModel = {fields: []}
            return expectSaga(sagas.getEntityModel)
              .provide([
                [select(sagas.listSelector), {entityModel}]
              ])
              .dispatch({type: SET_ENTITY_MODEL})
              .returns(entityModel)
              .run()
          })
        })

        describe('setSimpleForm saga', () => {
          test('should set simple form fields', () => {
            return expectSaga(sagas.setSimpleForm)
              .put.like({action: {type: actions.SET_FORM_FIELDS_FLAT}})
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

        describe('loadSearchFilter saga', () => {
          test('should call helper and set defaultFilters as active', () => {
            const searchFilters = [
              {uniqueId: 'active', label: 'Active', defaultFilter: 'true'},
              {uniqueId: 'inactive', label: 'Inactive'}
            ]

            const expectedDispatch = [
              {uniqueId: 'active', label: 'Active', defaultFilter: 'true', active: true},
              {uniqueId: 'inactive', label: 'Inactive'}
            ]

            return expectSaga(sagas.loadSearchFilter, 'User')
              .provide([
                [matchers.call.fn(rest.fetchSearchFilters), searchFilters],
                [select(sagas.entityListSelector), {}]
              ])
              .put(actions.setSearchFilters(expectedDispatch))
              .run()
          })
          test('should not set searchfilter when parent exists', () => {
            const searchFilters = [
              {uniqueId: 'active', label: 'Active', defaultFilter: 'true'},
              {uniqueId: 'inactive', label: 'Inactive'}
            ]

            const expectedDispatch = [
              {uniqueId: 'active', label: 'Active', defaultFilter: 'true'},
              {uniqueId: 'inactive', label: 'Inactive'}
            ]

            return expectSaga(sagas.loadSearchFilter, 'User')
              .provide([
                [matchers.call.fn(rest.fetchSearchFilters), searchFilters],
                [select(sagas.entityListSelector), {parent: {}}]
              ])
              .put(actions.setSearchFilters(expectedDispatch))
              .run()
          })
        })

        describe('save search filter', () => {
          test('should save search filter after modal', () => {
            const expectedSorting = ['sorting']
            return expectSaga(sagas.saveSearchFilter)
              .provide([
                [select(sagas.listSelector), {sorting: expectedSorting}],
                [select(sagas.entityListSelector), {entityName: 'entityName'}],
                [matchers.call.fn(listSagas.getBasicQuery), {where: 'query', filter: ['filtername']}],
                [channel, {}],
                {
                  take() {
                    return 'searchFilterName'
                  }
                },
                [matchers.call.fn(sagas.saveNewSearchFilter)],
                [matchers.call.fn(sagas.loadSearchFilter)],
                [matchers.call.fn(sagas.resetSearch)]
              ])
              .put.like({
                action: {
                  type: 'notifier/MODAL_COMPONENT',
                  payload: {
                    id: 'filter-save',
                    title: 'client.entity-list.search.settings.saveAsFilter',
                    message: null,
                    closable: true
                  }
                }
              })
              .call.like({fn: channel})
              .call(
                sagas.saveNewSearchFilter,
                'searchFilterName',
                'entityName',
                'query',
                expectedSorting,
                ['filtername']
              )
              .call(sagas.loadSearchFilter, 'entityName')
              .call(sagas.resetSearch)
              .run()
          })
          test('should call rest save', () => {
            const sorting = [{
              field: 'sorting',
              order: 'asc'
            }, {
              field: 'other',
              order: 'desc'
            }]
            const expectedContent = {
              method: 'POST',
              body: {
                name: 'searchFilterName',
                query: 'query',
                entityName: 'entityName',
                order: 'sorting asc, other desc',
                filters: ['filtername']
              }
            }
            return expectSaga(
              sagas.saveNewSearchFilter,
              'searchFilterName',
              'entityName',
              'query',
              sorting,
              ['filtername']
            ).provide([
              [matchers.call.fn(rest.requestSaga)]
            ])
              .call(rest.requestSaga, 'client/searchfilters', expectedContent)
              .run()
          })
        })

        describe('delete search filter', () => {
          test('should reload filters after modal', () => {
            return expectSaga(sagas.deleteSearchFilter, {payload: {primaryKey: '1'}})
              .provide([
                [select(sagas.inputSelector), {actionAppComponent: {}, navigationStrategy: {}}],
                [select(sagas.entityListSelector), {entityName: 'entityName'}],
                [channel, {}],
                {
                  take() {
                    return true
                  }
                },
                [matchers.call.fn(sagas.loadSearchFilter)],
                [matchers.call.fn(sagas.resetSearch)]
              ])
              .put.like({
                action: {
                  type: 'notifier/MODAL_COMPONENT',
                  payload: {
                    id: 'filter-delete',
                    title: 'client.actions.delete.title',
                    message: null,
                    closable: true
                  }
                }
              })
              .call.like({fn: channel})
              .call(sagas.loadSearchFilter, 'entityName')
              .call(sagas.resetSearch)
              .run()
          })
          test('should not reload filters when not deleted', () => {
            return expectSaga(sagas.deleteSearchFilter, {payload: {primaryKey: '1'}})
              .provide([
                [select(sagas.inputSelector), {actionAppComponent: {}, navigationStrategy: {}}],
                [select(sagas.entityListSelector), {entityName: 'entityName'}],
                [channel, {}],
                {
                  take() {
                    return false
                  }
                }
              ])
              .put.like({
                action: {
                  type: 'notifier/MODAL_COMPONENT',
                  payload: {
                    id: 'filter-delete',
                    title: 'client.actions.delete.title',
                    message: null,
                    closable: true
                  }
                }
              })
              .call.like({fn: channel})
              .not.call(sagas.loadSearchFilter, 'entityName')
              .not.call(sagas.resetSearch)
              .run()
          })
        })

        describe('saveDefaultSearchFilter saga', () => {
          test('should save active filter as default', () => {
            const searchFilters = [
              {
                key: '1',
                active: false
              },
              {
                key: '2',
                active: true
              }
            ]
            const formDefinition = {
              id: 'User_search',
              modelName: 'User'
            }
            const expectedPreferences = {
              'User.User_search.searchfilter': '2'
            }
            return expectSaga(sagas.saveDefaultSearchFilter)
              .provide([
                [select(sagas.searchFormSelector), {searchFilters, formDefinition}],
                [matchers.call.fn(rest.savePreferences)]
              ])
              .call(rest.savePreferences, expectedPreferences)
              .put(notifier.info(
                'success',
                'client.entity-list.search.settings.defaultFilter.save.success',
                null,
                null,
                3000
              ))
              .run()
          })
        })

        describe('resetDefaultSearchFilter saga', () => {
          test('should delete custom default search filter', () => {
            const formDefinition = {
              id: 'User_search',
              modelName: 'User'
            }
            return expectSaga(sagas.resetDefaultSearchFilter)
              .provide([
                [select(sagas.searchFormSelector), {formDefinition}],
                [matchers.call.fn(rest.deleteUserPreferences)]
              ])
              .call(rest.deleteUserPreferences, 'User.User_search.searchfilter')
              .put(notifier.info(
                'success',
                'client.entity-list.search.settings.defaultFilter.reset.success',
                null,
                null,
                3000
              ))
              .run()
          })
        })
      })
    })
  })
})
