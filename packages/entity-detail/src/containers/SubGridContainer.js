import {connect} from 'react-redux'
import {externalEvents, actionEmitter} from 'tocco-app-extensions'

import SubGrid from '../components/SubGrid'
import {navigateToCreate} from './../modules/entityDetail/actions'

const mapStateToProps = (state, props) => ({
  appId: state.entityDetail.appId,
  entityKey: state.entityDetail.entity.key,
  entityName: state.entityDetail.entity.model,
  detailFormName: state.entityDetail.formDefinition.id,
  showSubGridsCreateButton: state.entityDetail.showSubGridCreateButton
})

const mapActionCreators = {
  onRowClick: e => externalEvents.fireExternalEvent('onSubGridRowClick', {
    id: e.id,
    gridName: e.gridName,
    relationName: e.relationName
  }),
  navigateToCreate,
  onNavigateToCreate: relationName => externalEvents.fireExternalEvent('onNavigateToCreate', relationName),
  dispatchEmittedAction: actionEmitter.dispatchEmittedAction
}

export default connect(mapStateToProps, mapActionCreators)(SubGrid)
