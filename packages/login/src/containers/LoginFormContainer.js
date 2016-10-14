import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import LoginForm from '../components/LoginForm'
import {changePage, setUsername, setPassword} from '../modules/login/actions'
import {login, setPending} from '../modules/actions'

const mapActionCreators = {
  changePage,
  setUsername,
  setPassword,
  setPending,
  login
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    message: state.loginForm.message,
    loginPending: state.loginForm.loginPending
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginForm))
