import {connect} from 'react-redux'

import actionEmitter from '../../actionEmitter'
import RemoteCreate from './RemoteCreate'

const mapActionCreators = {
  emitAction: actionEmitter.dispatchEmittedAction
}

export default connect(null, mapActionCreators)(RemoteCreate)
