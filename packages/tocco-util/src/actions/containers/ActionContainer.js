import {connect} from 'react-redux'
import {actionInvoke} from '../modules/actions'

import Action from '../components/Action'

const mapActionCreators = {
  onClick: actionInvoke
}

const mapStateToProps = (state, props) => {
  return {
    test: state.input
  }
}

export default connect(mapStateToProps, mapActionCreators)(Action)
