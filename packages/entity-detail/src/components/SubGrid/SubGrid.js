import PropTypes from 'prop-types'
import React from 'react'
import EntityListApp from 'tocco-entity-list/src/main'

const SubGrid = props => {
  const formBase = `${props.detailFormName}_${props.gridName}`
  return (
    <EntityListApp
      id={`${props.appId}-subgrid-${formBase}`}
      entityName={props.modelField.targetEntity}
      formName={formBase}
      limit={props.limit}
      searchFormType={props.showSearchForm ? 'basic' : 'none'}
      onRowClick={e => {
        if (props.onRowClick) {
          props.onRowClick({
            id: e.id,
            gridName: props.gridName,
            relationName: props.relationName
          })
        }
      }}
      onNavigateToCreate={() => {
        props.navigateToCreate(props.relationName)
      }}
      emitAction={action => { props.dispatchEmittedAction(action) }}
      parent={{
        key: props.entityKey,
        reverseRelationName: props.modelField.reverseRelationName,
        model: props.entityName
      }}
    />
  )
}

SubGrid.defaultProps = {
  limit: 5
}

SubGrid.propTypes = {
  entityKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  entityName: PropTypes.string.isRequired,
  detailFormName: PropTypes.string.isRequired,
  gridName: PropTypes.string.isRequired,
  relationName: PropTypes.string.isRequired,
  modelField: PropTypes.shape({
    targetEntity: PropTypes.string,
    reverseRelationName: PropTypes.string
  }).isRequired,
  onRowClick: PropTypes.func,
  navigateToCreate: PropTypes.func.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired,
  showSubGridsCreateButton: PropTypes.bool,
  appId: PropTypes.string,
  showSearchForm: PropTypes.bool,
  limit: PropTypes.number
}

export default SubGrid
