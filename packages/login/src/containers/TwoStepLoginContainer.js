import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import TwoStepLoginForm from '../components/TwoStepLoginForm'
import {twoStepLogin} from '../modules/twoStepLogin/actions'

const mapActionCreators = {
  twoStepLogin
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    requestedCode: state.twoStepLogin.requestedCode,
    loginPending: state.loginForm.loginPending
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(TwoStepLoginForm))
