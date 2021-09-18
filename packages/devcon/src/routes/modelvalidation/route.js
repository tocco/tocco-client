import ModelValidationView from './components/ModelValidationView'
import modelValidation from './modules'
import sagas from './modules/sagas'

export default {
  container: ModelValidationView,
  reducers: {
    modelValidation
  },
  sagas: [sagas]
}
