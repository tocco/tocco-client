import _get from 'lodash/get'
import {getFormSyncErrors, getFormAsyncErrors, getFormSubmitErrors} from 'redux-form'

const getFormGeneralErrors = formName => state => _get(state, `form.${formName}.error`, {})

const getFormErrors = formId => state => ({
  ...getFormSyncErrors(formId)(state),
  ...getFormAsyncErrors(formId)(state),
  ...getFormSubmitErrors(formId)(state),
  _error: getFormGeneralErrors(formId)(state)
})

export default {
  getFormErrors
}
