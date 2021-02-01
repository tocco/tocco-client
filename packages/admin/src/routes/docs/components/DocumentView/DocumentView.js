import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

import Action from '../Action/'

const DocumentView = ({match, history, breadcrumbs, emitAction}) => {
  const handleEntityDeleted = () => {
    const lastList = breadcrumbs.slice().reverse()
      .find(breadcrumb => breadcrumb.type === 'list')
    const lastListUrl = `/docs/${lastList.path}`
    history.push(lastListUrl)
  }

  return (
    <EntityDetailApp
      entityName="Resource"
      entityId={match.params.key}
      formName="Resource"
      mode="update"
      actionAppComponent={Action}
      emitAction={emitAction}
      onEntityDeleted={handleEntityDeleted}
    />
  )
}

DocumentView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  emitAction: PropTypes.func.isRequired
}

export default DocumentView
