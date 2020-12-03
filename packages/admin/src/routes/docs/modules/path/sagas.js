import {rest} from 'tocco-app-extensions'
import {takeLatest, all, call, put, select} from 'redux-saga/effects'

import * as actions from './actions'

export const textResourceSelector = (state, key) => state.intl.messages[key] || key
export const docsPathSelector = state => state.docs.path

const DOC_PATH_REGEX = /^\/docs\/doc\/(\d+)\/detail$/
const PARENT_PATH_REGEX = /^\/docs\/(domain|folder)\/(\d+)\/list$/

export const getResourceNode = pathname => {
  const docMatches = DOC_PATH_REGEX.exec(pathname)
  return docMatches && docMatches.length >= 2 ? {
    model: 'Resource',
    key: docMatches[1]
  } : null
}

export const getParentNode = pathname => {
  const parentMatches = PARENT_PATH_REGEX.exec(pathname)
  if (parentMatches && parentMatches.length >= 3) {
    const model = parentMatches[1].charAt(0).toUpperCase() + parentMatches[1].slice(1)
    const key = parentMatches[2]
    return {
      model,
      key
    }
  }
  return null
}

export const getNode = pathname => {
  let node = getResourceNode(pathname)
  if (!node) {
    node = getParentNode(pathname)
  }
  return node
}

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
