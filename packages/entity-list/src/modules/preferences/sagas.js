import {rest} from 'tocco-app-extensions'
import {call, put, select, takeLatest, all} from 'redux-saga/effects'

import * as actions from './actions'
import {entityListSelector} from '../list/sagas'
import {setPositions} from './actions'
import * as util from '../../util/preferences'

export const inputSelector = state => state.input

export const preferencesSelector = state => state.preferences

export default function* sagas() {
  yield all([
    takeLatest(actions.LOAD_PREFERENCES, loadPreferences),
    takeLatest(actions.CHANGE_POSITION, changePosition)
  ])
}

export function* loadPreferences() {
  const listState = yield select(entityListSelector)
  const formName = `${listState.formName}_list`
  const preferences = yield call(rest.fetchUserPreferences, `${formName}*`)
  yield put(setPositions(util.getPositions(preferences)))
}

export function* changePosition({payload}) {
  const {field, afterFieldPosition, columns} = payload
  let {positions} = yield select(preferencesSelector)

  if (Object.keys(positions).length === 0) {
    positions = yield call(util.getPositionsFromColumns, columns)
  }

  const newPositions = yield call(util.changePosition, positions, field, afterFieldPosition)
  yield put(setPositions(newPositions))
  const listState = yield select(entityListSelector)
  const formName = `${listState.formName}_list`
  yield call(rest.deleteUserPreferences, `${formName}.*.positions`)
  const positionPreferences = yield call(util.getPositionsPreferencesToSave, formName, newPositions)
  yield call(rest.savePreferences, positionPreferences)
}
