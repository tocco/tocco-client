import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import TwoStepLoginForm from '../components/TwoStepLoginForm'
import {changePage} from '../modules/login/actions'
import {twoStepLogin} from '../modules/twoStepLogin/actions'

const mapActionCreators = {
  changePage,
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
