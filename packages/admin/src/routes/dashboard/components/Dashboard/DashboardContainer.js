import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import Dashboard from './Dashboard'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default connect(null, mapActionCreators)(injectIntl(Dashboard))
