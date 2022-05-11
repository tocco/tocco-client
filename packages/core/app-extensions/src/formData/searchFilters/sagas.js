import {all, call, put, select, takeLatest} from 'redux-saga/effects'

import rest from '../../rest'
import * as actions from './actions'
import {searchFilterResponseTransformer} from './utils'

export default function* sagas() {
  yield all([takeLatest(actions.LOAD_SEARCH_FILTERS, loadSearchFilters)])
}

export const searchFiltersSelector = state => state.formData.searchFilters

export function* loadSearchFilters({payload}) {
  const {entity, group} = payload
  const searchFilter = yield select(searchFiltersSelector)

  if (!searchFilter[entity]) {
    const searchFilterResponse = yield call(rest.requestSaga, `client/searchfilters/${entity}`, {
      ...(group ? {queryParams: {group}} : {})
    })
    const searchFilters = yield call(searchFilterResponseTransformer, searchFilterResponse)

    yield put(actions.setSearchFilter(entity, searchFilters))
  }
}
