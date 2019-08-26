import _get from 'lodash/get'
import {all, call, fork, put, select, takeEvery} from 'redux-saga/effects'

import * as tooltipActions from './actions'
import rest from '../../rest'

export default function* sagas() {
  yield all([
    fork(takeEvery, tooltipActions.LOAD_TOOLTIP, loadToolTip)
  ])
}

export const tooltipSelector = (state, entityName, id) =>
  _get(state, `formData.tooltips.data.${entityName}.${id}`, null)

export function* loadToolTip({payload: {entity, id}}) {
  if (entity) {
    const tooltip = yield select(tooltipSelector, entity, id)

    if (tooltip == null) {
      const response = yield call(rest.requestSaga, `entity/${entity}/${id}/display/tooltip`, {})
      const {display} = response.body
      yield put(tooltipActions.setToolTip(entity, id, display))
    }
  }
}
