import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import _get from 'lodash/get'
import {
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors
} from 'redux-form'
import {errorLogging} from 'tocco-app-extensions'

import DetailForm from '../components/DetailForm/DetailForm'
import {
  unloadDetailView,
  submitForm,
  fireTouched
} from '../modules/entityDetail/actions'

const mapActionCreators = {
  unloadDetailView,
  submitForm,
  fireTouched,
  logError: errorLogging.logError
}

const getFormGeneralErrors = formName =>
  state => (
    _get(state, `form.${formName}.error`, {})
  )

const mapStateToProps = state => ({
  formDefinition: state.entityDetail.formDefinition,
  entity: state.entityDetail.entity,
  entityModel: state.entityDetail.entityModel,
  formValues: getFormValues('detailForm')(state),
  formErrors: {
    ...getFormSyncErrors('detailForm')(state),
    ...getFormAsyncErrors('detailForm')(state),
    ...getFormSubmitErrors('detailForm')(state),
    _error: getFormGeneralErrors('detailForm')(state)
  },
  formInitialValues: getFormInitialValues('detailForm')(state),
  lastSave: state.entityDetail.lastSave
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailForm))
