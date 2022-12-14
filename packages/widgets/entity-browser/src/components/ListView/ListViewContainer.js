import {connect} from 'react-redux'
import {actionEmitter, externalEvents} from 'tocco-app-extensions'

import ListView from './ListView'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  fireStateChangeEvent: externalEvents.fireStateChangeEvent
}

const mapStateToProps = (state, props) => {
  const id = `${state.entityBrowser.appId}_entity-browser-list`
  const storeId = `${id}_${props.router.history.location.pathname}`
  return {
    id,
    storeId,
    locale: state.intl.locale,
    entityName: state.entityBrowser.entityName,
    formName: state.entityBrowser.formBase,
    scrollBehaviour: state.entityBrowser.scrollBehaviour,
    searchFormType: state.input.searchFormType || 'simple_advanced',
    limit: state.input.limit,
    searchFilters: state.input.searchFilters,
    preselectedSearchFields: state.input.preselectedSearchFields,
    simpleSearchFields: state.input.simpleSearchFields,
    modifyFormDefinition: state.input.modifyFormDefinition,
    disableDetailView: state.input.disableDetailView,
    reportIds: state.input.reportIds
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListView)
