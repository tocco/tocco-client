import DbRefactoring from './components/DbRefactoring'
import dbRefactoring from './modules'
import sagas from './modules/sagas'

export default {
  container: DbRefactoring,
  reducers: {
    dbRefactoring
  },
  sagas: [sagas]
}
