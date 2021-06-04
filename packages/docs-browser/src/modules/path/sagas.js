import {rest} from 'tocco-app-extensions'
import {takeLatest, all, call, put, select} from 'redux-saga/effects'

import getNode from '../../utils/getNode'
import * as actions from './actions'

export const textResourceSelector = (state, key) => state.intl.messages[key] || key
export const docsPathSelector = state => state.docs.path
export const rootNodesSelector = state => state.input.rootNodes

export function* getSearchBreadcrumbs() {
  return [{
    display: yield select(textResourceSelector, 'client.docs-browser.breadcrumbs.start'),
    path: '',
    type: 'list'
  }, {
    display: yield select(textResourceSelector, 'client.docs-browser.breadcrumbs.searchResults'),
    path: '',
    type: 'list'
  }]
}

export function* loadBreadcrumbs({payload: {location}}) {
  const node = getNode(location)
  const pathState = yield select(docsPathSelector)

  let breadcrumbs

  if (pathState.searchMode && !node) {
    breadcrumbs = yield call(getSearchBreadcrumbs)
  } else {
    const url = node ? `documents/${node.model}/${node.key}/breadcrumbs` : 'documents/breadcrumbs'
    const options = {
      queryParams: {
        rootnodes: yield call(getRootNodesParam)
      }
    }
    const result = yield call(rest.requestSaga, url, options)
    breadcrumbs = result.body.breadcrumbs
  }

  yield put(actions.setBreadcrumbs(breadcrumbs))
}

function* getRootNodesParam() {
  const rootNodes = yield select(rootNodesSelector)
  return Array.isArray(rootNodes) && rootNodes.length > 0
    ? rootNodes.map(node => `${node.entityName}/${node.key}`).join(',')
    : null
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_BREADCRUMBS, loadBreadcrumbs)
  ])
}
