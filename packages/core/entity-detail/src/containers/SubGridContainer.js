import {connect} from 'react-redux'
import {externalEvents, actionEmitter} from 'tocco-app-extensions'

import SubGrid from '../components/SubGrid'
import {navigateToCreate} from './../modules/entityDetail/actions'

const mapStateToProps = (state, props) => ({
  appId: state.entityDetail.appId,
  entityKey: state.entityDetail.entity.key,
  entityName: state.entityDetail.entity.model,
  detailFormName: state.entityDetail.formDefinition.id,
  navigationStrategy: state.input.navigationStrategy,
  actionAppComponent: state.input.actionAppComponent,
  locale: state.intl.locale
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
