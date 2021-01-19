import {combineReducers} from 'redux'

import DocsRoute from './components/DocsRoute'
import path, {sagas as pathSagas} from './modules/path'
import create, {sagas as createSagas} from './modules/create'

export default {
  container: DocsRoute,
  reducers: {
    docs: combineReducers({path, create})
  },
  sagas: [pathSagas, createSagas]
}
