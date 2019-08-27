import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {fork, select, takeLatest} from 'redux-saga/effects'

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
              fork(takeLatest, actions.LOAD_SEARCH_FILTERS, sagas.loadSearchFilters)
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

            const filters = {
              display: 'Filter 1',
              key: 'filter1'
            }

            return expectSaga(sagas.loadSearchFilters, args)
              .provide([
                [select(sagas.searchFiltersSelector), {}],
                [matchers.call.fn(rest.fetchEntities), filters]
              ])
              .put(actions.setSearchFilter(args.payload.entity, filters))
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
