import {connect} from 'react-redux'

import Action from '../components/Action'
import {actionInvoke} from '../modules/actions'

const mapActionCreators = {
  onClick: actionInvoke
}

export default connect(null, mapActionCreators)(Action)
