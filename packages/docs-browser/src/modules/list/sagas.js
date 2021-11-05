import {all, put, takeLatest} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'

export function* changeListParent({payload}) {
  yield put(externalEvents.fireExternalEvent('onListParentChange', payload.parent))
}

export function* changeSelection({payload}) {
  yield put(externalEvents.fireExternalEvent('onSelectChange', payload.selection))
}

export function* changeSearchFormCollapsed({payload}) {
  yield put(externalEvents.fireExternalEvent('onSearchFormCollapsedChange', payload.collapsed))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.CHANGE_LIST_PARENT, changeListParent),
    takeLatest(actions.CHANGE_SELECTION, changeSelection),
    takeLatest(actions.CHANGE_SEARCH_FORM_COLLAPSED, changeSearchFormCollapsed)
  ])
}
