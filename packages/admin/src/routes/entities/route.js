import {combineReducers} from 'redux'

import EntitiesRoute from './components/EntitiesRoute'
import path from './modules/path'
import sagas from './modules/path/sagas'

export default {
  container: EntitiesRoute,
  reducers: {
    entities: combineReducers({path})
  },
  sagas: [sagas]
}
