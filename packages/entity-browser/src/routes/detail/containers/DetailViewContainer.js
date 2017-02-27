import {connect} from 'react-redux'
import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {
  getFormInitialValues,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors
} from 'redux-form'

import {closeEntityDetail} from '../../entity-browser/modules/entityBrowser/actions'
import {loadEntity, submitForm, loadRelationEntities} from '../modules/detailView/actions'
import DetailView from '../components/DetailView'
import {logError} from 'tocco-util/src/errorLogging'

const mapActionCreators = {
  loadEntity,
  closeEntityDetail,
  submitForm,
  loadRelationEntities,
  logError
}

const getFormGeneralErros = formName =>
  state => (
    _get(state, `form.${formName}.error`, {})
  )

const mapStateToProps = (state, props) => ({
  formDefinition: state.detailView.formDefinition,
  entity: state.detailView.entity,
  selectBoxStores: state.detailView.selectBoxStores,
  entityModel: state.entityBrowser.entityModel,
  formErrors: {
    ...getFormSyncErrors('detailForm')(state),
    ...getFormAsyncErrors('detailForm')(state),
    ...getFormSubmitErrors('detailForm')(state),
    _error: getFormGeneralErros('detailForm')(state)
  },
  formInitialValues: getFormInitialValues('detailForm')(state),
  lastSave: state.detailView.lastSave
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

