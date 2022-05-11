import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'

import {fetchSpecificConfigEntityId, linkCreatedSpecificConfig, fireSuccess} from '../../modules/detailView'
import WidgetConfigDetailView from './WidgetConfigDetailView'

const mapActionCreators = {
  fetchSpecificConfigEntityId,
  linkCreatedSpecificConfig,
  fireSuccess,
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const mapStateToProps = state => ({
  specificConfigEntityId: state.detailView.specificConfigEntityId,
  linking: state.detailView.linking
})

export default connect(mapStateToProps, mapActionCreators)(WidgetConfigDetailView)
