import {all, call, fork, put, select, takeEvery} from 'redux-saga/effects'

import * as tooltipActions from './actions'
import {requestSaga} from '../../rest'

import _get from 'lodash/get'

export default function* sagas() {
  yield all([
    fork(takeEvery, tooltipActions.LOAD_TOOLTIP, loadToolTip)
  ])
}

export const tooltipSelector = (state, entityName, id) => _get(state, `${entityName}.${id}`, null)

export function* loadToolTip({payload: {entity, id}}) {
  const tooltip = yield select(tooltipSelector, entity, id)

  if (tooltip == null) {
    const response = yield call(requestSaga, `entity/${entity}/${id}/display/tooltip`, {})
    const {display} = response.body
    yield put(tooltipActions.setToolTip(entity, id, display))
  }
}
