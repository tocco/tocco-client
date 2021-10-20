import React from 'react'
import {put, call, all, take, takeLatest, takeEvery, select} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'
import {channel} from 'redux-saga'

import * as actions from './actions'
import InfoBoxSettings from '../../components/InfoBoxSettings/InfoBoxSettings'
import {mapColAndRowToPosition, prepareInfoBoxes} from '../../utils/positionUtils'

export const dashboardSelector = state => state.dashboard

export default function* sagas() {
  yield all([
    call(loadDashboard),
    takeLatest(actions.LOAD_DASHBOARD, loadDashboard),
    takeLatest(actions.SAVE_INFOBOX_POSITIONS, saveInfoBoxPositions),
    takeLatest(actions.SAVE_INFOBOX_HEIGHT, saveInfoBoxHeight),
    takeEvery(actions.DISPLAY_INFOBOX_SETTINGS_MODAL, displayInfoBoxSettings),
    takeEvery(actions.RESET_INFOBOX_SETTINGS, resetInfoBoxSettings)
  ])
}

export function* loadDashboard() {
  const options = {
    method: 'GET'
  }
  const response = yield call(rest.requestSaga, 'client/dashboard', options)
  const infoBoxes = response.body.infoboxes
  yield put(actions.setDashboard(prepareInfoBoxes(infoBoxes)))
  return infoBoxes
}

export function* saveInfoBoxPositions({payload: {infoBoxes}}) {
  const updatedInfoBoxes = infoBoxes.map(box => ({...box, position: mapColAndRowToPosition(box.col, box.row)}))
  const preferences = updatedInfoBoxes.reduce((acc, box) => ({
    ...acc,
    [`${box.id}:POSITION`]: box.position
  }), {})
  yield call(saveInfoBoxPreferences, preferences)
  
  yield put(actions.setDashboard(updatedInfoBoxes))
  return updatedInfoBoxes
}

export function* saveInfoBoxHeight({payload: {id, height}}) {
  const {infoBoxes} = yield select(dashboardSelector)
  const updatedInfoBoxes = infoBoxes.map(box => ({...box, height: box.id === id ? height : box.height}))
  const preferences = {
    [`${id}:HEIGHT`]: height
  }
  yield call(saveInfoBoxPreferences, preferences)
  
  yield put(actions.setDashboard(updatedInfoBoxes))
  return updatedInfoBoxes
}

export function* displayInfoBoxSettings() {
  const {infoBoxes} = yield select(dashboardSelector)
  const answerChannel = yield call(channel)
  yield put(notification.modal(
    'dashboard-infobox-settings',
    'client.dashboard.preferences.show.title',
    null,
    ({close}) => {
      const onOk = columns => {
        close()
        answerChannel.put(columns)
      }

      return <InfoBoxSettings initialInfoBoxes={infoBoxes} onOk={onOk}/>
    },
    true
  ))

  yield call(saveInfoBoxSettings, answerChannel)
}

function* saveInfoBoxSettings(answerChannel) {
  const infoBoxes = yield take(answerChannel)

  const preferences = infoBoxes.reduce((acc, box) => ({
    ...acc,
    [`${box.id}:STATUS`]: box.folded ? 'folded' : 'open'
  }), {})
  yield call(saveInfoBoxPreferences, preferences)

  yield put(actions.setDashboard(infoBoxes))
  return infoBoxes
}

export function* resetInfoBoxSettings() {
  yield all([
    call(rest.deleteUserPreferences, '*:HEIGHT'),
    call(rest.deleteUserPreferences, '*:POSITION'),
    call(rest.deleteUserPreferences, '*:STATUS')
  ])
  yield call(loadDashboard)
}

function* saveInfoBoxPreferences(preferences) {
  yield call(rest.savePreferences, preferences, '/nice2/ui/settings/infoboxes')
}
