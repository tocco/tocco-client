import {connect} from 'react-redux'

import actionEmitter from '../../actionEmitter'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default connect(null, mapActionCreators)
