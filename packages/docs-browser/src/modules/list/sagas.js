import {takeLatest, all, put} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'

export function* changeListParent({payload}) {
  yield put(externalEvents.fireExternalEvent('onListParentChange', payload.parent))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.CHANGE_LIST_PARENT, changeListParent)
  ])
}
