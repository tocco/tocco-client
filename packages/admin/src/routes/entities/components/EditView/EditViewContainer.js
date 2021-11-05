import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import {propagateRefresh} from '../../modules/path/actions'
import EditView from './EditView'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  propagateRefresh
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EditView))
