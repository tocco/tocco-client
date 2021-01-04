import {connect} from 'react-redux'
import EntityListApp from 'tocco-entity-list/src/main'
import {actionEmitter} from 'tocco-app-extensions'
import {queryString as queryStringUtil, viewPersistor} from 'tocco-util'
import {RouterLink} from 'tocco-ui'
import React from 'react'
import PropTypes from 'prop-types'

import Action from '../../../components/LazyAction'

const mapDispatchToProps = (dispatch, props) => ({
  emitAction: action => {
    dispatch(actionEmitter.dispatchEmittedAction(action))
  }
})

const navigateToCreate = ({history, match, relationName}) => {
  if (relationName) {
    history.push(`${match}/${relationName}/`)
  } else {
    history.push('/detail')
  }
}

const navigateToAction = (history, definition, selection) => {
  const search = queryStringUtil.toQueryString({
    selection,
    actionProperties: definition.properties
  })
  history.push({
    pathname: '/action/' + definition.appId,
    state: {definition, selection},
    search
  })
}

const DetailLinkRelative = ({entityKey, children, relation}) =>
  <RouterLink to={`${relation ? relation + '/' : ''}detail/${entityKey}`}>{children}</RouterLink>

DetailLinkRelative.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string
}

const mapStateToProps = (state, props) => ({
  id: `${state.entityBrowser.appId}_entity-browser-list`,
  locale: state.input.locale,
  entityName: state.entityBrowser.entityName,
  formName: state.entityBrowser.formBase,
  searchFormType: state.input.showSearchForm ? 'basic' : 'none',
  limit: state.input.limit,
  searchFilters: state.input.searchFilters,
  preselectedSearchFields: state.input.preselectedSearchFields,
  disableSimpleSearch: state.input.disableSimpleSearch,
  simpleSearchFields: state.input.simpleSearchFields,
  onRowClick: e => {
    props.router.history.push(`/detail/${e.id}`)
  },
  showLink: true,
  navigationStrategy: {
    DetailLinkRelative,
    navigateToActionRelative: (definition, selection) =>
      navigateToAction(props.router.history, definition, selection),
    navigateToCreateRelative: relationName => navigateToCreate(
      {relationName, history: props.router.history, match: props.router.match}
    )
  },

  searchFormPosition: 'top',
  actionAppComponent: Action,
  store: viewPersistor.viewInfoSelector(props.router.history.location.pathname).store,
  onStoreCreate: store => {
    viewPersistor.persistViewInfo(props.router.history.location.pathname, {store}, 0)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityListApp)
