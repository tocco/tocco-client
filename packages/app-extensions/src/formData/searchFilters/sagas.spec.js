import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeLatest} from 'redux-saga/effects'

import rest from '../../rest'
import * as sagas from './sagas'
import * as actions from './actions'

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

            const filters = [
              {key: '1', unique_id: 'filter_1'},
              {key: '3', unique_id: 'filter_3'}
            ]

            const displays = {
              Search_filter: {
                1: 'Filter 1',
                3: 'Filter 3'
              }
            }

            const expectedFilters = [
              {key: '1', unique_id: 'filter_1', display: 'Filter 1'},
              {key: '3', unique_id: 'filter_3', display: 'Filter 3'}
            ]

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFiltersSelector), {}],
                [matchers.call.fn(rest.fetchEntities), filters],
                [matchers.call.fn(rest.fetchDisplays), displays]
              ])
              .put(actions.setSearchFilter(args.payload.entity, expectedFilters))
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
