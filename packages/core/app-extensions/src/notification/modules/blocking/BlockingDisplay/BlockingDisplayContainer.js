import {connect} from 'react-redux'

import BlockingDisplay from './BlockingDisplay'

const mapStateToProps = state => ({
  blockers: state.notification.blocking.blockers
})

export default connect(mapStateToProps)(BlockingDisplay)
