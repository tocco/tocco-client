import PropTypes from 'prop-types'
import React from 'react'
import EntityListApp from 'tocco-entity-list/src/main'
import styled from 'styled-components'
import {viewPersistor} from 'tocco-util'

const StyledListApp = styled.div`
  width: 100%;
`

const SubGrid = props => {
  const formBase = `${props.detailFormName}_${props.formField.path}`
  const id = `${props.appId}-subgrid-${props.entityName}-${props.entityKey}-${props.formField.reverseRelation}`

  return (
    <StyledListApp>
      <EntityListApp
        id={id}
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
        parent={{
          key: props.entityKey,
          reverseRelationName: props.formField.reverseRelation,
          model: props.entityName
        }}
        emitAction={props.emitAction}
        store={viewPersistor.viewInfoSelector(id).store}
        onStoreCreate={store => {
          viewPersistor.persistViewInfo(id, {store})
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
  showSubGridsCreateButton: PropTypes.bool,
  appId: PropTypes.string,
  showSearchForm: PropTypes.bool,
  limit: PropTypes.number,
  emitAction: PropTypes.func.isRequired
}

export default SubGrid
