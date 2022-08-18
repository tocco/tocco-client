import {connect} from 'react-redux'
import {externalEvents, actionEmitter} from 'tocco-app-extensions'

import SubGrid from '../components/SubGrid'
import {navigateToCreate} from './../modules/entityDetail/actions'

const mapStateToProps = (state, props) => ({
  appId: state.input.appId,
  entityKey: state.entityDetail.entity.key,
  entityName: state.entityDetail.entity.model,
  detailFormName: state.entityDetail.formDefinition.id,
  navigationStrategy: state.input.navigationStrategy,
  locale: state.intl.locale,
  modifyFormDefinition: state.input.modifyFormDefinition,
  actionAppComponent: state.input.actionAppComponent,
  reportIds: state.input.reportIds
})

const mapActionCreators = {
  onRowClick: e =>
    externalEvents.fireExternalEvent('onSubGridRowClick', {
      id: e.id,
      gridName: e.gridName,
      relationName: e.relationName
    }),
  navigateToCreate,
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default connect(mapStateToProps, mapActionCreators)(SubGrid)
