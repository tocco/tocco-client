import addToStore from './addToStore'
import {REDUX_FORM_NAME as reduxFormName} from './components/TemplateForm'
import TemplateForm from './components/TemplateFormContainer'
import {getValues} from './modules/sagas'

export default {
  TemplateForm,
  reduxFormName,
  getFormValues: getValues,
  addToStore
}
