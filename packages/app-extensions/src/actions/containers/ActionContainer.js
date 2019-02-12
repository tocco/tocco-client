import {connect} from 'react-redux'

import {actionInvoke} from '../modules/actions'
import Action from '../components/Action'

const mapActionCreators = {
  onClick: actionInvoke
}

export default connect(null, mapActionCreators)(Action)
