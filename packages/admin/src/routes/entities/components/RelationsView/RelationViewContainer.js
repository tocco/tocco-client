import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter, viewPersistor} from 'tocco-app-extensions'

import RelationsView from './RelationsView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  relations: state.entities.path.relations,
  relationsInfo: state.entities.path.relationsInfo,
  persistedViewInfo: viewPersistor.viewInfoSelector(state, props.history.location.pathname)
})

const mapActionCreators = {
  persistViewInfo: viewPersistor.persistViewInfo,
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(RelationsView))
