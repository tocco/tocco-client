import PropTypes from 'prop-types'
import styled from 'styled-components'
import EntityListApp from 'tocco-entity-list/src/main'
import {viewPersistor} from 'tocco-util'

const StyledListApp = styled.div`
  width: 100%;
`

const SubGrid = props => {
  const formBase = `${props.detailFormName}_${props.formField.path}`
  // eslint-disable-next-line max-len
  const id = `${props.appId}-subgrid-${props.entityName}-${props.entityKey}-${props.formField.targetEntity}-${props.formField.reverseRelation}`

  return (
    <StyledListApp>
      <EntityListApp
        id={id}
        entityName={props.formField.targetEntity}
        formName={formBase}
        limit={props.limit}
        searchFormType={props.showSearchForm ? 'simple_advanced' : 'none'}
        navigationStrategy={props.navigationStrategy}
        showLink={true}
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
          model: props.entityName,
          relationName: props.formField.path
        }}
        emitAction={props.emitAction}
        store={viewPersistor.viewInfoSelector(id).store}
        onStoreCreate={store => {
          viewPersistor.persistViewInfo(id, {store})
        }}
        scrollBehaviour="inline"
        tableMinHeight="300px"
        locale={props.locale}
        modifyFormDefinition={props.modifyFormDefinition}
        actionAppComponent={props.actionAppComponent}
        reportIds={props.reportIds}
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
  emitAction: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.objectOf(PropTypes.func),
  locale: PropTypes.string,
  modifyFormDefinition: PropTypes.func,
  actionAppComponent: PropTypes.func,
  reportIds: PropTypes.arrayOf(PropTypes.string)
}

export default SubGrid
