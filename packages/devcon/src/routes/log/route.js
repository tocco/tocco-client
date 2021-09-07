import LogView from './components/LogView'
import log from './modules'
import sagas from './modules/sagas'

export default {
  container: LogView,
  reducers: {
    log
  },
  sagas: [sagas]
}
