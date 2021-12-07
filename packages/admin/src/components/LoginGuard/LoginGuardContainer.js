import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {notification, login} from 'tocco-app-extensions'

import LoginGuard from './LoginGuard'

const mapActionCreators = {
  doSessionCheck: login.doSessionCheck,
  confirm: notification.confirm
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.login.loggedIn
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginGuard))
