import {connect} from 'react-redux'
import SubGrid from '../components/SubGrid'
import {externalEvents, actionEmitter} from 'tocco-util'

const mapStateToProps = (state, props) => ({
  appId: state.entityDetail.appId,
  entityKey: state.entityDetail.entity.key,
  detailFormName: state.entityDetail.formDefinition.id,
  showSubGridsCreateButton: state.entityDetail.showSubGridCreateButton
})

const mapActionCreators = {
  onRowClick: e => externalEvents.fireExternalEvent('onSubGridRowClick', {
    id: e.id,
    gridName: e.gridName,
    relationName: e.relationName
  }),
  onNavigateToCreate: e => externalEvents.fireExternalEvent('onSubGridNavigateToCreate', {
    gridName: e.gridName,
    relationName: e.relationName
  }),
  dispatchEmittedAction: actionEmitter.dispatchEmittedAction
}

export default connect(mapStateToProps, mapActionCreators)(SubGrid)
