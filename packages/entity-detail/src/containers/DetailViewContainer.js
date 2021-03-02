import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {getFormInitialValues} from 'redux-form'
import {errorLogging} from 'tocco-app-extensions'

import {
  loadDetailView,
  unloadDetailView
} from '../modules/entityDetail/actions'
import DetailView from '../components/DetailView/DetailView'

const mapActionCreators = {
  loadDetailView,
  unloadDetailView,
  logError: errorLogging.logError
}

const mapStateToProps = (state, props) => {
  return {
    entityName: state.entityDetail.entityName,
    entityId: state.entityDetail.entityId,
    entityModel: state.entityDetail.entityModel,
    fieldDefinitions: state.entityDetail.fieldDefinitions,
    mode: state.entityDetail.mode,
    formInitialValues: getFormInitialValues('detailForm')(state)
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))
