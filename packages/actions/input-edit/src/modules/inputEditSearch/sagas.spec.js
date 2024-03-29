import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeLatest, all, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import {loadData} from '../inputEditTable/sagas'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('input-edit', () => {
  describe('input-edit-search', () => {
    describe('sagas', () => {
      test('should fork child sagas', () => {
        const generator = rootSaga()
        expect(generator.next().value).to.deep.equal(
          all([
            takeLatest(actions.INITIALIZE_SEARCH, sagas.initialize),
            takeLatest(actions.SET_SEARCH_QUERIES, sagas.setSearchQueries)
          ])
        )
        expect(generator.next().done).to.be.true
      })

      describe('initialize', () => {
        test('should load forms', () => {
          const expectedForm = {}
          return expectSaga(sagas.initialize)
            .provide([
              [matchers.call.fn(rest.fetchForm), expectedForm],
              [select(sagas.inputEditSelector), {validation: {valid: true}}]
            ])
            .put(actions.setForm(expectedForm))
            .run()
        })
      })

      describe('setSearchQueries', () => {
        test('should pass search queries to loadData if initialized', () => {
          const expectedSearchQueries = []
          return expectSaga(sagas.setSearchQueries, {payload: {searchQueries: expectedSearchQueries}})
            .provide([[matchers.call.fn(loadData)], [select(sagas.inputEditSearchSelector), {initialized: true}]])
            .call(loadData, {newSearchQueries: expectedSearchQueries})
            .run()
        })

        test('should set initialized true on first call', () => {
          const expectedSearchQueries = []
          return expectSaga(sagas.setSearchQueries, {payload: {searchQueries: expectedSearchQueries}})
            .provide([[matchers.call.fn(loadData)], [select(sagas.inputEditSearchSelector), {initialized: false}]])
            .put(actions.setInitialized(true))
            .run()
        })
      })
    })
  })
})
