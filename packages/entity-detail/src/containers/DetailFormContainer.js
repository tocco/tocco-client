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
import {errorLogging, formData} from 'tocco-util'
import EntityListApp from 'tocco-entity-list/src/main'

import DetailForm from '../components/DetailForm/DetailForm'
import {
  unloadDetailView,
  submitForm,
  uploadDocument,
  fireTouched,
  advancedSearchUpdate
} from '../modules/entityDetail/actions'

const mapActionCreators = {
  unloadDetailView,
  submitForm,
  loadRelationEntities: formData.loadRelationEntities,
  loadTooltip: formData.loadTooltip,
  uploadDocument,
  logError: errorLogging.logError,
  fireTouched,
  openAdvancedSearch: (...args) => formData.openAdvancedSearch(EntityListApp, advancedSearchUpdate, ...args)
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
