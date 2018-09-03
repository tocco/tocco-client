import React from 'react'
import {connect} from 'react-redux'
import SimpleFormApp from 'tocco-simple-form/src/main'

import actionEmitter from '../../actionEmitter'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

// SimpleFormApp is not used directly intentionally. This is a workaround to support the circular dependency.
export default connect(null, mapActionCreators)(props => <SimpleFormApp {...props}/>)
