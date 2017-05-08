import {connect} from 'react-redux'
import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {
  getFormInitialValues,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors
} from 'redux-form'

import {loadDetailView, unloadDetailView, submitForm} from '../modules/actions'
import {loadRelationEntity, loadRemoteEntity} from '../../entity-browser/modules/actions'
import DetailView from '../components/DetailView/DetailView'
import {logError} from 'tocco-util/src/errorLogging'
import parseUrl from '../../../util/detailView/parseUrl'

const mapActionCreators = {
  loadDetailView,
  unloadDetailView,
  submitForm,
  loadRelationEntity,
  loadRemoteEntity,
  logError
}

const getFormGeneralErros = formName =>
  state => (
    _get(state, `form.${formName}.error`, {})
  )

const mapStateToProps = (state, props) => {
  const {modelPaths, entityId, parentUrl} = parseUrl(props.router.match.url)
  return {
    formDefinition: state.detail.formDefinition,
    entity: state.detail.entity,
    relationEntities: state.entityBrowser.relationEntities,
    remoteEntities: state.entityBrowser.remoteEntities,
    entityModel: state.detail.entityModel,
    modelPaths: modelPaths,
    entityId: entityId,
    formErrors: {
      ...getFormSyncErrors('detailForm')(state),
      ...getFormAsyncErrors('detailForm')(state),
      ...getFormSubmitErrors('detailForm')(state),
      _error: getFormGeneralErros('detailForm')(state)
    },
    formInitialValues: getFormInitialValues('detailForm')(state),
    lastSave: state.detail.lastSave,
    parentUrl
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))
