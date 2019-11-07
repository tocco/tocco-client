import PropTypes from 'prop-types'
import React from 'react'
import EntityListApp from 'tocco-entity-list/src/main'

const SubGrid = props => {
  const formBase = `${props.detailFormName}_${props.gridName}`
  return (
    <div>
      <EntityListApp
        id={`${props.appId}-subgrid-${formBase}`}
        keepStore={true}
        entityName={props.modelField.targetEntity}
        formBase={formBase}
        limit={25}
        showSearchForm={props.showSearchForm}
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
        onNavigateToCreate={e => {
          props.onNavigateToCreate({
            gridName: props.gridName,
            relationName: props.relationName
          })
        }
        }
        showCreateButton={props.showSubGridsCreateButton}
        emitAction={action => { props.dispatchEmittedAction(action) }}
      />
    </div>
  )
}

SubGrid.propTypes = {
  entityKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailFormName: PropTypes.string.isRequired,
  gridName: PropTypes.string.isRequired,
  relationName: PropTypes.string.isRequired,
  modelField: PropTypes.shape({
    targetEntity: PropTypes.string,
    reverseRelationName: PropTypes.string
  }).isRequired,
  onRowClick: PropTypes.func,
  onNavigateToCreate: PropTypes.func.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired,
  showSubGridsCreateButton: PropTypes.bool,
  appId: PropTypes.string,
  showSearchForm: PropTypes.bool
}

export default SubGrid
