import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {getFormValues, getFormInitialValues} from 'redux-form'
import {errorLogging, form} from 'tocco-app-extensions'

import DetailForm from '../components/DetailForm/DetailForm'
import {submitForm, fireTouched} from '../modules/entityDetail/actions'

const mapActionCreators = {
  submitForm,
  fireTouched,
  logError: errorLogging.logError
}

const mapStateToProps = state => ({
  customRenderedActions: state.input.customRenderedActions,
  formDefinition: state.entityDetail.formDefinition,
  entity: state.entityDetail.entity,
  formValues: getFormValues('detailForm')(state),
  formErrors: form.selectors.getFormErrors('detailForm')(state),
  formInitialValues: getFormInitialValues('detailForm')(state),
  lastSave: state.entityDetail.lastSave
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailForm))
