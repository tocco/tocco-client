import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import ListView from './ListView'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfo
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))
