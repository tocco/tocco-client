import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const CreateView = props => {
  const mode = 'create'

  if (!props.currentViewInfo) {
    return null
  }

  const {model, reverseRelation, key} = props.currentViewInfo
  const entityName = model.name

  const defaultValues = [
    ...((reverseRelation && key) ? [{id: reverseRelation, value: key}] : [])
  ]

  return (
    <EntityDetailApp
      entityName={entityName}
      formName={`${entityName}_detail`}
      mode={mode}
      defaultValues={defaultValues}
    />
  )
}

CreateView.propTypes = {
  match: PropTypes.object,
  currentViewInfo: PropTypes.object
}

export default CreateView
