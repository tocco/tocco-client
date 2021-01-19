import {rest} from 'tocco-app-extensions'
import {takeLatest, all, call, put, select} from 'redux-saga/effects'

import getNode from '../../utils/getNode'
import * as actions from './actions'

export const textResourceSelector = (state, key) => state.intl.messages[key] || key
export const docsPathSelector = state => state.docs.path

export function* getSearchBreadcrumbs() {
  return [{
    display: yield select(textResourceSelector, 'client.admin.docs.breadcrumbs.start'),
    path: '',
    type: 'list'
  }, {
    display: yield select(textResourceSelector, 'client.admin.breadcrumbs.searchResults'),
    path: '',
    type: 'list'
  }]
}

export function* loadBreadcrumbs({payload: {location}}) {
  const node = getNode(location)
  const pathState = yield select(docsPathSelector)

  let breadcrumbs

  if (pathState.searchMode && (!node || node.model !== 'Resource')) {
    breadcrumbs = yield call(getSearchBreadcrumbs)
  } else {
    const url = node ? `documents/${node.model}/${node.key}/breadcrumbs` : 'documents/breadcrumbs'
    const result = yield call(rest.requestSaga, url)
    breadcrumbs = result.body.breadcrumbs
  }

  yield put(actions.setBreadcrumbs(breadcrumbs))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_BREADCRUMBS, loadBreadcrumbs)
  ])
}
