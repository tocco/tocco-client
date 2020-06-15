import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

import StyledLink from '../../../../components/StyledLink/StyledLink'
import {goBack} from '../../../../utils/routing'
import Action from '../Action/LazyAction'

const ListView = ({match, history, currentViewInfo, emitAction, persistViewInfo, persistedViewInfo}) => {
  if (!currentViewInfo) {
    return null
  }

  const handleRowClick = ({id}) => {
    history.push(match.url.replace(/list$/, '') + id)
  }

  const handleNavigateToCreate = relationName => {
    if (relationName) {
      history.push(`${match.url}/${relationName}/create`)
    } else {
      const entityBaseUrl = goBack(match.url)
      history.push(entityBaseUrl + '/create')
    }
  }

  const handleNavigateToAction = ({definition, selection}) => {
    const entityBaseUrl = goBack(match.url)
    history.push({
      pathname: entityBaseUrl + '/action/' + definition.appId,
      state: {definition, selection}
    })
  }

  return (
    <EntityListApp
      emitAction={emitAction}
      limit={40}
      id={`${currentViewInfo.model.name}_list`}
      entityName={currentViewInfo.model.name}
      formName={currentViewInfo.model.name}
      onRowClick={handleRowClick}
      {...(currentViewInfo.reverseRelation && {
        parent: {
          key: currentViewInfo.parentKey,
          reverseRelationName: currentViewInfo.reverseRelation,
          model: currentViewInfo.parentModel.name
        }
      })}
      showLink={true}
      linkFactory={{
        detail: (entity, relation, key, children) =>
          entity
            ? <StyledLink to={`/e/${entity}/${key}`} target="_blank">{children}</StyledLink>
            : <StyledLink to={key}>{children}</StyledLink>
      }}
      onNavigateToCreate={handleNavigateToCreate}
      searchFormPosition="left"
      searchFormType="admin"
      store={persistedViewInfo.store}
      onStoreCreate={store => {
        persistViewInfo(history.location.pathname, currentViewInfo.level, {store})
      }}
      onNavigateToAction={handleNavigateToAction}
      actionAppComponent={Action}
    />
  )
}

ListView.propTypes = {
  match: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired,
  persistViewInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object,
  persistedViewInfo: PropTypes.shape({
    store: PropTypes.object
  })
}

export default ListView
