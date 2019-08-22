import {combineReducers} from 'redux'

import sagas from './modules/path/sagas'
import path from './modules/path'
import EntitiesRoute from './components/EntitiesRoute'

export default {
  container: EntitiesRoute,
  reducers: {
    entities: combineReducers({path})
  },
  sagas: [sagas]
}
