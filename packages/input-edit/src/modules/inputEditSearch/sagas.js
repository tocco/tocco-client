import {all, takeLatest, call, put, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from '../inputEditSearch/actions'
import {loadData} from '../inputEditTable/sagas'

export const inputEditSelector = state => state.inputEdit
export const inputEditSearchSelector = state => state.inputEditSearch

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_SEARCH, initialize),
    takeLatest(actions.SET_SEARCH_QUERIES, setSearchQueries)
  ])
}

export function* initialize() {
  const {validation} = yield select(inputEditSelector)
  if (validation.valid) {
    const form = yield call(rest.fetchForm, 'Input_edit_data', 'search')
    yield put(actions.setForm(form))
  }
}

export function* setSearchQueries({payload}) {
  const {initialized} = yield select(inputEditSearchSelector)
  if (initialized) {
    yield call(loadData, {newSearchQueries: payload.searchQueries})
  } else {
    yield put(actions.setInitialized(true))
  }
}
