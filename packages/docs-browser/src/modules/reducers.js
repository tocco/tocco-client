import {combineReducers} from 'redux'

import path, {sagas as pathSagas} from './path'
import create, {sagas as createSagas} from './create'

export default {
  docs: combineReducers({path, create})
}

export const sagas = [pathSagas, createSagas]
