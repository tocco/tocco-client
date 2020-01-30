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

const searchFilterEntity = 'Search_filter'

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
    const searchFilters = yield call(
      rest.fetchEntities, searchFilterEntity, query, requestOptions, searchFilterTransformer
    )
    const displays = yield call(rest.fetchDisplays, {Search_filter: searchFilters.map(s => s.key)})
    const searchFiltersWithDisplay = searchFilters.map(s => ({...s, display: displays[searchFilterEntity][s.key]}))
    yield put(actions.setSearchFilter(entity, searchFiltersWithDisplay))
  }
}
