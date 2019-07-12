import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const DetailView = props => {
  const mode = props.match.params.key ? 'update' : 'create'
  if (!props.currentViewInfo) {
    return null
  }

  const entityName = props.currentViewInfo.model.name

  return (
    <EntityDetailApp
      entityName={entityName}
      entityId={props.currentViewInfo.key}
      formName={`${entityName}_detail`}
      mode={mode}
    />
  )
}

DetailView.propTypes = {
  match: PropTypes.object,
  currentViewInfo: PropTypes.object
}

export default DetailView
