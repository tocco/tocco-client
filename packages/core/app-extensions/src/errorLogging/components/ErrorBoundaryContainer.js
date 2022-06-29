import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {logError} from '../actions'
import ErrorBoundary from './ErrorBoundary'

const mapActionCreators = {
  logError
}

export default connect(null, mapActionCreators)(injectIntl(ErrorBoundary))
