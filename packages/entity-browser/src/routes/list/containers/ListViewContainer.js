import {connect} from 'react-redux'
import EntityListApp from 'tocco-entity-list/src/main'
import {actionEmitter, viewPersistor} from 'tocco-app-extensions'

const mapDispatchToProps = (dispatch, props) => ({
  emitAction: action => { dispatch(actionEmitter.dispatchEmittedAction(action)) },
  onStoreCreate: store => {
    dispatch(viewPersistor.persistViewInfo(props.router.history.location.pathname, 0, {store}))
  }
})

const handleNavigateToCreate = props => relationName => {
  if (relationName) {
    props.router.history.push(`${props.router.match.url}/${relationName}/`)
  } else {
    props.router.history.push('/detail')
  }
}

const mapStateToProps = (state, props) => ({
  id: `${state.entityBrowser.appId}_entity-browser-list`,
  store: viewPersistor.viewInfoSelector(state, props.router.history.location.pathname).store,
  locale: state.input.locale,
  entityName: state.entityBrowser.entityName,
  formBase: state.entityBrowser.formBase,
  searchFormType: state.input.showSearchForm ? 'basic' : 'none',
  limit: state.input.limit,
  searchFilters: state.input.searchFilters,
  preselectedSearchFields: state.input.preselectedSearchFields,
  disableSimpleSearch: state.input.disableSimpleSearch,
  simpleSearchFields: state.input.simpleSearchFields,
  onRowClick: e => {
    props.router.history.push(`/detail/${e.id}`)
  },
  onNavigateToCreate: handleNavigateToCreate(props),
  searchFormPosition: 'top'
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityListApp)
