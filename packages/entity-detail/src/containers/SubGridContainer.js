import {connect} from 'react-redux'
import SubGrid from '../components/SubGrid'
import {externalEvents} from 'tocco-util'

const mapStateToProps = (state, props) => ({
  appId: state.entityDetail.appId,
  entityKey: state.entityDetail.entity.key,
  detailFormName: state.entityDetail.formDefinition.name,
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
  })
}

export default connect(mapStateToProps, mapActionCreators)(SubGrid)
