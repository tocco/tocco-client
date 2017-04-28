import React from 'react'
import EntityListApp from 'entity-list'

const SubGrid = props => {
  return (
    <div>
      <EntityListApp
        entityName={props.modelField.targetEntity}
        limit="5"
        showSearchForm={false}
        preselectedSearchFields={[{
          id: props.modelField.reverseRelationName,
          value: props.entityKey,
          hidden: true
        }]}
        tableDefinition={props.tableDefinition}
      />
    </div>
  )
}

SubGrid.propTypes = {
  entityKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  tableDefinition: React.PropTypes.shape({
    type: React.PropTypes.oneOf(['ch.tocco.nice2.model.form.components.table.Table']),
    children: React.PropTypes.array
  }).isRequired,

  relationName: React.PropTypes.string.isRequired,
  modelField: React.PropTypes.shape({
    targetEntity: React.PropTypes.string,
    reverseRelationName: React.PropTypes.string
  }).isRequired
}

export default SubGrid
