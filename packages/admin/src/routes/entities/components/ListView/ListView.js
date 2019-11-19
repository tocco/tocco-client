import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

import StyledLink from '../../../../components/StyledLink/StyledLink'
import {goBack} from '../../../../utils/routing'

const ListView = ({match, history, currentViewInfo, emitAction}) => {
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

  return (
    <EntityListApp
      emitAction={emitAction}
      id={`${currentViewInfo.model.name}_list`}
      entityName={currentViewInfo.model.name}
      formBase={currentViewInfo.model.name}
      onRowClick={handleRowClick}
      {...(currentViewInfo.reverseRelation && {
        parent: {
          key: currentViewInfo.key,
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
    />
  )
}

ListView.propTypes = {
  match: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object
}

export default ListView
