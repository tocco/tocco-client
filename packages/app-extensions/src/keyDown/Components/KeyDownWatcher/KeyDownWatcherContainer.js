import {connect} from 'react-redux'

import {keyDown} from '../../actions'
import KeyDownWatcher from './KeyDownWatcher'

const mapActionCreators = {
  keyDownHandler: keyDown
}

export default connect(null, mapActionCreators)(KeyDownWatcher)
