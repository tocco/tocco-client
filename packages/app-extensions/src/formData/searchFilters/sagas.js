import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects'

import * as actions from './actions'
import rest from '../../rest'
import {searchFilterTransformer} from './utils'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.LOAD_SEARCH_FILTERS, loadSearchFilters)
  ])
}

export const searchFiltersSelector = state => state.formData.searchFilters

export function* loadSearchFilters({payload}) {
  const {entity, group} = payload
  const searchFilter = yield select(searchFiltersSelector)

  if (!searchFilter[entity]) {
    const query = {
      conditions: {
        entity: entity,
        ...(group ? {'relSearch_filter_group.unique_id': group} : {})
      },
      paths: ['unique_id']
    }

    const requestOptions = {method: 'GET'}
    const searchFilters = yield call(rest.fetchEntities,
      'Search_filter', query, requestOptions, searchFilterTransformer)
    yield put(actions.setSearchFilter(entity, searchFilters))
  }
}
