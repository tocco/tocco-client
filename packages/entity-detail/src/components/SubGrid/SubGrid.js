import PropTypes from 'prop-types'
import React from 'react'
import EntityListApp from 'tocco-entity-list/src/main'
import styled from 'styled-components'

const StyledListApp = styled.div`
  width: 100%;
`

const SubGrid = props => {
  const formBase = `${props.detailFormName}_${props.formField.path}`
  return (
    <StyledListApp>
      <EntityListApp
        id={`${props.appId}-subgrid-${formBase}`}
        entityName={props.formField.targetEntity}
        formName={formBase}
        limit={props.limit}
        searchFormType={props.showSearchForm ? 'basic' : 'none'}
        onRowClick={e => {
          if (props.onRowClick) {
            props.onRowClick({
              id: e.id,
              gridName: props.formField.path,
              relationName: props.formField.path
            })
          }
        }}
        onNavigateToCreate={() => {
          props.navigateToCreate(props.formField.path)
        }}
        emitAction={action => { props.dispatchEmittedAction(action) }}
        parent={{
          key: props.entityKey,
          reverseRelationName: props.formField.reverseRelation,
          model: props.entityName
        }}
      />
    </StyledListApp>
  )
}

SubGrid.defaultProps = {
  limit: 5
}

SubGrid.propTypes = {
  entityKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  entityName: PropTypes.string.isRequired,
  detailFormName: PropTypes.string.isRequired,
  formField: PropTypes.shape({
    path: PropTypes.string,
    targetEntity: PropTypes.string,
    reverseRelation: PropTypes.string
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
