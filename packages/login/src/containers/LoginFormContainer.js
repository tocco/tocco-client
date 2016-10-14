import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import LoginForm from '../components/LoginForm'
import {changePage, setUsername, setPassword} from '../modules/login/actions'
import {login} from '../modules/actions'

const mapActionCreators = {
  changePage,
  setUsername,
  setPassword,
  login
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    message: state.loginForm.message
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginForm))
