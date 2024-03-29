import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import LoginForm from '../components/LoginForm'
import {login} from '../modules/actions'
import {changePage, setUsername, setPassword} from '../modules/login/actions'

const mapActionCreators = {
  changePage,
  setUsername,
  setPassword,
  login
}

const mapStateToProps = state => ({
  username: state.login.username,
  password: state.login.password,
  message: state.loginForm.message,
  loginPending: state.loginForm.loginPending,
  captchaKey: state.login.captchaKey,
  recaptchaActivated: state.loginForm.recaptchaActivated
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginForm))
