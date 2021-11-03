import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import queryString from 'query-string'
import {viewPersistor} from 'tocco-util'

import Action from '../Action/LazyAction'
import {currentViewPropType} from '../../utils/propTypes'
import navigationStrategy from '../../utils/navigationStrategy'
import DocsViewAdapter from './DocsViewAdapter'

const ListView = ({match, history, currentViewInfo, emitAction, searchFormCollapsed, saveUserPreferences}) => {
  if (!currentViewInfo) {
    return null
  }

  const queryParams = queryString.parse(history.location.search)

  const handleRowClick = ({id}) => {
    history.push(match.url.replace(/list$/, '') + id)
  }

  if (currentViewInfo.model.name === 'Resource') {
    return <DocsViewAdapter
      currentViewInfo={currentViewInfo}
    />
  }

  return (
    <EntityListApp
      emitAction={emitAction}
      limit={25}
      id={`${currentViewInfo.model.name}_list`}
      entityName={currentViewInfo.model.name}
      formName={queryParams.formName || currentViewInfo.model.name}
      onRowClick={handleRowClick}
      {...(currentViewInfo.reverseRelation && {
        parent: {
          key: currentViewInfo.parentKey,
          reverseRelationName: currentViewInfo.reverseRelation,
          model: currentViewInfo.parentModel.name
        }
      })}
      showLink={true}
      navigationStrategy={navigationStrategy(history, match)}
      searchFormPosition="left"
      searchFormType="admin"
      initialStore={viewPersistor.viewInfoSelector(history.location.pathname).store}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(history.location.pathname, {store}, currentViewInfo.level)
      }}
      actionAppComponent={Action}
      tql={queryParams.tql}
      searchFormCollapsed={searchFormCollapsed}
      onSearchFormCollapsedChange={({collapsed}) => {
        saveUserPreferences('admin.list.searchFormCollapsed', collapsed)
      }}
    />
  )
}

ListView.propTypes = {
  match: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentViewInfo: currentViewPropType,
  persistedViewInfo: PropTypes.shape({
    store: PropTypes.object
  }),
  searchFormCollapsed: PropTypes.bool,
  saveUserPreferences: PropTypes.func
}

export default ListView
