import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

const ListView = ({match, history, currentViewInfo}) => {
  const handleRowClick = ({id}) => {
    history.push(match.url.replace(/list$/, '') + id)
  }

  if (!currentViewInfo) {
    return null
  }

  return (
    <EntityListApp
      id={`${match.params.entity}_list`}
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
    />
  )
}

ListView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object
}

export default ListView
