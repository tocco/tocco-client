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

import {loadDetailView, unloadDetailView, submitForm, loadRelationEntity} from '../modules/entityDetail/actions'
// import {loadRemoteEntity} from '../../entity-browser/modules/actions' // TODO
import DetailView from '../components/DetailView/DetailView'
import {logError} from 'tocco-util/src/errorLogging'

const mapActionCreators = {
  loadDetailView,
  unloadDetailView,
  submitForm,
  loadRelationEntity,
  loadRemoteEntity: () => {}, // TODO
  logError
}

const getFormGeneralErros = formName =>
  state => (
    _get(state, `form.${formName}.error`, {})
  )

const mapStateToProps = (state, props) => {
  return {
    formDefinition: state.entityDetail.formDefinition,
    entity: state.entityDetail.entity,
    relationEntities: state.entityDetail.relationEntities,
    remoteEntities: {}, // TODO
    entityModel: state.entityDetail.entityModel,
    entityId: state.input.entityId,
    formValues: getFormValues('detailForm')(state),
    formErrors: {
      ...getFormSyncErrors('detailForm')(state),
      ...getFormAsyncErrors('detailForm')(state),
      ...getFormSubmitErrors('detailForm')(state),
      _error: getFormGeneralErros('detailForm')(state)
    },
    formInitialValues: getFormInitialValues('detailForm')(state),
    lastSave: state.entityDetail.lastSave
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))
