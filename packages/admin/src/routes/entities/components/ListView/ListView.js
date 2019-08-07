import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

const ListView = ({match, history, currentViewInfo, emitAction}) => {
  const handleRowClick = ({id}) => {
    history.push(match.url.replace(/list$/, '') + id)
  }

  if (!currentViewInfo) {
    return null
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
