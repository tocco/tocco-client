import {combineReducers} from 'redux'

import DocsRoute from './components/DocsRoute'
import path from './modules/path'
import sagas from './modules/path/sagas'

export default {
  container: DocsRoute,
  reducers: {
    docs: combineReducers({path})
  },
  sagas: [sagas]
}
