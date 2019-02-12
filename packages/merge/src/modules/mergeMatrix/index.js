import {combineReducers} from 'redux'

import moduleSagas from './sagas'
import entities from './entities'
import model from './model'
import targetEntityPk from './targetEntityPk'
import selections from './selections'

import {fork, all} from 'redux-saga/effects'

export default combineReducers({
  entities,
  model,
  targetEntityPk,
  selections
})

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}
