import LogView from './components/LogView'
import sqlLog from './modules'
import sagas from './modules/sagas'

export default {
  container: LogView,
  reducers: {
    sqlLog
  },
  sagas: [sagas]
}
