import React from 'react'
import DetailForm from './DetailForm'

import * as ToccoUi from 'tocco-ui'

const entityToInitialValues = entity => {
  if (!entity || !entity.paths) return {}
  const result = {}
  const paths = entity.paths
  Object.keys(entity.paths).forEach(key => {
    if (paths[key].value !== null) {
      result[key] = paths[key].value.value
    }
  })
  return result
}

const formValuesToEntity = (values, entity) => {
  Object.keys(values).forEach(key => {
    entity.paths[key].value.value = values[key]
  })

  return entity
}

const DetailView = props => {
  const handleSubmit = values => {
    props.saveEntity(formValuesToEntity(values, props.entity))
  }

  return (
    <div className="detail-view">
      <ToccoUi.Button icon="glyphicon-chevron-left" onClick={props.closeEntityDetail} label="Back"/>
      <h3>DetailView</h3>
      <DetailForm
        onSubmit={handleSubmit}
        formDefinition={props.formDefinition}
        entity={props.entity}
        initialValues={entityToInitialValues(props.entity)}
      />
    </div>
  )
}

DetailView.propTypes = {
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  closeEntityDetail: React.PropTypes.func.isRequired,
  entity: React.PropTypes.object,
  saveEntity: React.PropTypes.func
}

export default DetailView

