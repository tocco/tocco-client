import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeLatest} from 'redux-saga/effects'

import rest from '../../rest'
import * as sagas from './sagas'
import * as actions from './actions'
import {requestSaga} from '../../rest/rest'
import {searchFilterResponseTransformer} from './utils'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('searchFilters', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              takeLatest(actions.LOAD_SEARCH_FILTERS, sagas.loadSearchFilters)
            ])
          })
        })

        describe('loadSearchFilters saga', () => {
          test('should load search filters', () => {
            const args = {
              payload: {
                entity: 'User',
                group: null
              }
            }

            const filtersResponse = {
              body: {
                filters: [
                  {key: '1', uniqueId: 'filter_1', label: 'Filter 1'},
                  {key: '3', uniqueId: 'filter_3', label: 'Filter 3 '}
                ]
              }
            }

            const searchFilters = [
              {key: '1', uniqueId: 'filter_1', display: 'Filter 1'},
              {key: '3', uniqueId: 'filter_3', display: 'Filter 3'}
            ]

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFiltersSelector), {}],
                [matchers.call.fn(rest.requestSaga), filtersResponse],
                [matchers.call.fn(searchFilterResponseTransformer), searchFilters]
              ])
              .call(requestSaga, 'client/searchfilters/User')
              .put(actions.setSearchFilter(args.payload.entity, searchFilters))
              .run()
          })

          test('should load search filters with group', () => {
            const args = {
              payload: {
                entity: 'User',
                group: 'group'
              }
            }

            const filtersResponse = {
              body: {
                filters: [
                  {key: '1', uniqueId: 'filter_1', label: 'Filter 1'},
                  {key: '3', uniqueId: 'filter_3', label: 'Filter 3 '}
                ]
              }
            }

            const searchFilters = [
              {key: '1', uniqueId: 'filter_1', display: 'Filter 1'},
              {key: '3', uniqueId: 'filter_3', display: 'Filter 3'}
            ]

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFiltersSelector), {}],
                [matchers.call.fn(rest.requestSaga), filtersResponse],
                [matchers.call.fn(searchFilterResponseTransformer), searchFilters]
              ])
              .call(requestSaga, 'client/searchfilters/User?group=group')
              .put(actions.setSearchFilter(args.payload.entity, searchFilters))
              .run()
          })

          test('should not load search filters if already loaded', () => {
            const args = {
              payload: {
                entity: 'User',
                group: null
              }
            }

            const existingSearchFilters = [{
              display: 'Filter 1',
              key: 'filter1'
            }]

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFiltersSelector), {User: existingSearchFilters}]
              ])
              .run()
          })
        })
      })
    })
  })
})
