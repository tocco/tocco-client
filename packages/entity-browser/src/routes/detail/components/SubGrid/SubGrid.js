import React from 'react'
import EntityListApp from 'entity-list'

const SubGrid = props => {
  return (
    <div>
      <h1>Sub Grid</h1>
      <p>Relation: {props.relationName}</p>
      <p>Columns: {props.formDefinition.children.length}</p>
      <EntityListApp id="rz"/>
    </div>
  )
}

SubGrid.propTypes = {
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  relationName: React.PropTypes.string.isRequired
}

export default SubGrid
