import {connect} from 'react-redux'

import actionEmitter from '../../actionEmitter'
import AdvancedSearch from './AdvancedSearch'

const mapActionCreators = {
  emitAction: actionEmitter.dispatchEmittedAction
}

export default connect(null, mapActionCreators)(AdvancedSearch)
