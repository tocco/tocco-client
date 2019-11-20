import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter, viewPersistor} from 'tocco-app-extensions'

import ListView from './ListView'
const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  persistViewInfo: viewPersistor.persistViewInfo
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  persistedViewInfo: viewPersistor.viewInfoSelector(state, props.history.location.pathname)
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))
