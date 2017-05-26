import React from 'react'
import EntityListApp from 'entity-list/src/main'

const SubGrid = props => {
  return (
    <div>
      <EntityListApp
        entityName={props.modelField.targetEntity}
        formBase={`${props.detailFormName}_${props.gridName}`}
        limit={5}
        showSearchForm={true}
        preselectedSearchFields={[{
          id: props.modelField.reverseRelationName,
          value: props.entityKey,
          hidden: true
        }]}
        onRowClick={e => {
          if (props.onRowClick) {
            props.onRowClick({
              id: e.id,
              gridName: props.gridName,
              relationName: props.relationName
            })
          }
        }}
      />
    </div>
  )
}

SubGrid.propTypes = {
  entityKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  detailFormName: React.PropTypes.string.isRequired,
  gridName: React.PropTypes.string.isRequired,
  relationName: React.PropTypes.string.isRequired,
  modelField: React.PropTypes.shape({
    targetEntity: React.PropTypes.string,
    reverseRelationName: React.PropTypes.string
  }).isRequired,
  onRowClick: React.PropTypes.func
}

export default SubGrid
