import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {getFormInitialValues} from 'redux-form'
import {errorLogging} from 'tocco-app-extensions'

import DetailView from '../components/DetailView/DetailView'
import {unloadDetailView} from '../modules/entityDetail/actions'

const mapActionCreators = {
  unloadDetailView,
  logError: errorLogging.logError
}

const mapStateToProps = (state, props) => {
  return {
    entityName: state.input.entityName,
    entityId: state.input.entityId,
    mode: state.input.mode,
    entityModel: state.entityDetail.entityModel,
    formDefinition: state.entityDetail.formDefinition,
    fieldDefinitions: state.entityDetail.fieldDefinitions,
    formInitialValues: getFormInitialValues('detailForm')(state)
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DetailView))
