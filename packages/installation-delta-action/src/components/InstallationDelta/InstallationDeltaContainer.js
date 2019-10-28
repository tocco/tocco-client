import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import InstallationDelta from './InstallationDelta'

const mapActionCreators = {}

const mapStateToProps = state => ({
  keys: state.input.keys

})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(InstallationDelta))
