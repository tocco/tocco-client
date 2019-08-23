import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {notifier} from 'tocco-app-extensions'

import {doSessionCheck} from '../../modules/session/actions'
import LoginGuard from './LoginGuard'

const mapActionCreators = {
  doSessionCheck,
  confirm: notifier.confirm
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.session.loggedIn
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginGuard))
