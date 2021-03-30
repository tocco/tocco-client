import {combineReducers} from 'redux'

import path, {sagas as pathSagas} from './path'
import create, {sagas as createSagas} from './create'
import list, {sagas as listSagas} from './list'
import move, {sagas as moveSagas} from './move'

export default {
  docs: combineReducers({path, create, list, move})
}

export const sagas = [pathSagas, createSagas, listSagas, moveSagas]
