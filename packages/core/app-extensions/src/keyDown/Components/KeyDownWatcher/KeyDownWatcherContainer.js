import {connect} from 'react-redux'

import {keyDown} from '../../actions'
import KeyDownWatcher from './KeyDownWatcher'

const mapActionCreators = {
  keyDownHandler: keyDown
}

const mapStateToProps = state => {
  return {
    config: state.keyDown?.config || []
  }
}

export default connect(mapStateToProps, mapActionCreators)(KeyDownWatcher)
