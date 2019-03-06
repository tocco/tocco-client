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
import {errorLogging, formData} from 'tocco-app-extensions'

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
  logError: errorLogging.logError,
  loadRelationEntities: formData.loadRelationEntities,
  loadTooltip: formData.loadTooltip,
  uploadDocument: formData.uploadDocument,
  openAdvancedSearch: formData.openAdvancedSearch,
  changeFieldValue: formData.changeFieldValue
}

const getFormGeneralErrors = formName =>
  state => (
    _get(state, `form.${formName}.error`, {})
  )

const mapStateToProps = state => {
  return {
    formDefinition: state.entityDetail.formDefinition,
    entity: state.entityDetail.entity,
    relationEntities: formData.relationEntitiesSelector(state),
    tooltips: formData.tooltipSelector(state),
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
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailForm))
