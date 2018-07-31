import React from 'react'
import {connect} from 'react-redux'
import actionEmitter from '../../actionEmitter'
import SimpleFormApp from 'tocco-simple-form/src/main'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

// SimpleFormApp is not used directly intentionally. This is a workaround to support the circular dependency.
export default connect(null, mapActionCreators)(props => <SimpleFormApp {...props}/>)
