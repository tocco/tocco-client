import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'

import ListView from '../components/ListView'

const mapDispatchToProps = dispatch => ({
  emitAction: action => {
    dispatch(actionEmitter.dispatchEmittedAction(action))
  }
})

const mapStateToProps = (state, props) => {
  const id = `${state.entityBrowser.appId}_entity-browser-list`
  const storeId = `${id}_${props.router.history.location.pathname}`
  return {
    id,
    storeId,
    locale: state.input.locale,
    entityName: state.entityBrowser.entityName,
    formName: state.entityBrowser.formBase,
    searchFormType: state.input.showSearchForm ? 'basic' : 'none',
    limit: state.input.limit,
    searchFilters: state.input.searchFilters,
    preselectedSearchFields: state.input.preselectedSearchFields,
    disableSimpleSearch: state.input.disableSimpleSearch,
    simpleSearchFields: state.input.simpleSearchFields
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
