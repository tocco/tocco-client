import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Dashboard from './Dashboard'

const mapStateToProps = state => ({
  infoboxes: state.dashboard.infoboxes
})

export default connect(mapStateToProps)(injectIntl(Dashboard))
