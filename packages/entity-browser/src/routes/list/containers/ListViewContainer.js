import {connect} from 'react-redux'
import EntityListApp from 'tocco-entity-list/src/main'
import {actionEmitter} from 'tocco-app-extensions'
import objectHash from 'object-hash'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const handleNavigateToCreate = props => relationName => {
  if (relationName) {
    props.router.history.push(`${props.router.match.url}/${relationName}/`)
  } else {
    props.router.history.push('/detail')
  }
}

const mapStateToProps = (state, props) => {
  const hash = objectHash(state.input)
  return {
    id: `${state.entityBrowser.appId}_entity-browser-list-${hash}`,
    keepStore: true,
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
  }
}

export default connect(mapStateToProps, mapActionCreators)(EntityListApp)
