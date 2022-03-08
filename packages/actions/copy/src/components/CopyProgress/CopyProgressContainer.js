import {connect} from 'react-redux'

import {startCopy} from '../../modules/copy/actions'
import CopyProgress from './CopyProgress'

const mapActionCreators = {
  startCopy
}

export default connect(null, mapActionCreators)(CopyProgress)
