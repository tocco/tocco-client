import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {notification} from 'tocco-app-extensions'

import {sessionHeartbeat} from '../../modules/session/actions'
import LoginGuard from './LoginGuard'

const mapActionCreators = {
  sessionHeartbeat,
  connectSocket: notification.connectSocket,
  confirm: notification.confirm
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.login.loggedIn
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginGuard))
