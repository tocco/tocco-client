import React from 'react'
import EntityListApp from 'entity-list'

const SubGrid = props => {
  return (
    <div>
      <EntityListApp
        limit="5"
        entityName={props.modelField.targetEntity}
        formBase="User"
        showSearchForm={false}
        preselectedSearchFields={[]}
        searchFilters={[]}
        simpleSearchFields=""
        formDefinition={props.formDefinition}
      />
    </div>
  )
}

SubGrid.propTypes = {
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  relationName: React.PropTypes.string.isRequired,
  modelField: React.PropTypes.shape({targetEntity: React.PropTypes.string}).isRequired
}

export default SubGrid
