import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const CreateView = props => {
  const mode = 'create'

  if (!props.currentViewInfo) {
    return null
  }

  const entityName = props.currentViewInfo.model.name

  return (
    <EntityDetailApp
      entityName={entityName}
      formName={`${entityName}_detail`}
      mode={mode}
    />
  )
}

CreateView.propTypes = {
  match: PropTypes.object,
  currentViewInfo: PropTypes.object
}

export default CreateView
