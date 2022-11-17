import {connect} from 'react-redux'

import actionEmitter from '../../../actionEmitter'
import DocsTreeSearch from './DocsTreeSearch'

const mapActionCreators = {
  emitAction: actionEmitter.dispatchEmittedAction
}

export default connect(null, mapActionCreators)(DocsTreeSearch)
