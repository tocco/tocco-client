import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {
  hasSubmitSucceeded,
  hasSubmitFailed,
  getFormInitialValues,
  getFormSyncErrors
} from 'redux-form'

import {closeEntityDetail} from '../modules/entityBrowser/actions'
import {submitForm, loadRelationEntities} from '../modules/detailView/actions'
import DetailView from '../components/DetailView'
import {logError} from 'tocco-util/src/errorLogging'

const mapActionCreators = {
  closeEntityDetail,
  submitForm,
  loadRelationEntities,
  logError
}

const mapStateToProps = (state, props) => ({
  formDefinition: state.detailView.formDefinition,
  entity: state.detailView.entity,
  selectBoxStores: state.detailView.selectBoxStores,
  formSubmitSucceeded: hasSubmitSucceeded('detailForm')(state),
  formSubmitFailed: hasSubmitFailed('detailForm')(state),
  entityModel: state.entityBrowser.entityModel,
  formSyncErrors: getFormSyncErrors('detailForm')(state),
  formInitialValues: getFormInitialValues('detailForm')(state)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))

