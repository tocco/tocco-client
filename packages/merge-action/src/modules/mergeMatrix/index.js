import {combineReducers} from 'redux'
import {fork} from 'redux-saga/effects'
import moduleSagas from './sagas'

import entities from './entities'
import model from './model'
import targetEntityPk from './targetEntityPk'
import selections from './selections'

export default combineReducers({
  entities,
  model,
  targetEntityPk,
  selections
})

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
