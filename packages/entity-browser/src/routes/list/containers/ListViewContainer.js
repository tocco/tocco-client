import {connect} from 'react-redux'
import EntityListApp from 'tocco-entity-list/src/main'
import {actionEmitter} from 'tocco-app-extensions'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const mapStateToProps = (state, props) => {
  return {
    id: `${state.entityBrowser.appId}_entity-browser-list`,
    keepStore: true,
    entityName: state.entityBrowser.entityName,
    formBase: state.entityBrowser.formBase,
    showSearchForm: state.input.showSearchForm,
    limit: state.input.limit,
    searchFilters: state.input.searchFilters,
    preselectedSearchFields: state.input.preselectedSearchFields,
    disableSimpleSearch: state.input.disableSimpleSearch,
    simpleSearchFields: state.input.simpleSearchFields,
    showCreateButton: state.input.showCreateButton,
    onRowClick: e => {
      props.router.history.push(`/detail/${e.id}`)
    },
    onNavigateToCreate: e => {
      props.router.history.push(`/detail/`)
    }
  }
}

export default connect(mapStateToProps, mapActionCreators)(EntityListApp)
