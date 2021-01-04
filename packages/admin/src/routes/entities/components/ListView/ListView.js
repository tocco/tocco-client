import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'
import queryString from 'query-string'
import {viewPersistor} from 'tocco-util'

import Action from '../Action/LazyAction'
import {currentViewPropType} from '../../utils/propTypes'
import ErrorView from '../../../../components/ErrorView'
import navigationStrategy from '../../utils/navigationStrategy'

const ListView = ({match, history, currentViewInfo, emitAction}) => {
  if (currentViewInfo && currentViewInfo.error) {
    return <ErrorView technicalReason={currentViewInfo.error.message}/>
  }

  if (!currentViewInfo) {
    return null
  }

  const queryParams = queryString.parse(location.search)

  const handleRowClick = ({id}) => {
    history.push(match.url.replace(/list$/, '') + id)
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
      store={viewPersistor.viewInfoSelector(history.location.pathname).store}
      onStoreCreate={store => {
        viewPersistor.persistViewInfo(history.location.pathname, {store}, currentViewInfo.level)
      }}
      actionAppComponent={Action}
      tql={queryParams.tql}
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
  })
}

export default ListView
