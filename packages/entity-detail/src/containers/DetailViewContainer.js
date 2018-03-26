import {connect} from 'react-redux'
import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors
} from 'redux-form'
import {
  loadDetailView,
  unloadDetailView,
  submitForm,
  loadRelationEntity,
  loadRemoteEntity,
  uploadDocument,
  fireTouched
} from '../modules/entityDetail/actions'
import DetailView from '../components/DetailView/DetailView'
import {errorLogging} from 'tocco-util'

const mapActionCreators = {
  loadDetailView,
  unloadDetailView,
  submitForm,
  loadRelationEntity,
  loadRemoteEntity,
  uploadDocument,
  logError: errorLogging.logError,
  fireTouched
}

const getFormGeneralErrors = formName =>
  state => (
    _get(state, `form.${formName}.error`, {})
  )

const mapStateToProps = (state, props) => {
  return {
    formDefinition: state.entityDetail.formDefinition,
    entity: state.entityDetail.entity,
    relationEntities: state.entityDetail.relationEntities,
    remoteEntities: state.entityDetail.remoteEntities,
    entityModel: state.entityDetail.entityModel,
    entityName: state.entityDetail.entityName,
    entityId: state.entityDetail.entityId,
    mode: state.entityDetail.mode,
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

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))
