import {all, takeLatest, call, put} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from '../inputEditSearch/actions'
import {loadData} from '../inputEditTable/sagas'

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_SEARCH, initialize),
    takeLatest(actions.SET_SEARCH_QUERIES, setSearchQueries)
  ])
}

export function* initialize() {
  const [model, form] = yield all([
    call(rest.fetchModel, 'Input_data'),
    call(rest.fetchForm, 'Input_edit', 'search')
  ])
  yield put(actions.setModel(model))
  yield put(actions.setForm(form))
}

export function* setSearchQueries({payload}) {
  yield call(loadData, {newSearchQueries: payload.searchQueries})
}
