import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import LoginForm from '../components/LoginForm'
import {changePage} from '../modules/login/actions'
import {setUsername} from '../modules/loginForm/actions'
import {login} from '../modules/actions'

const mapActionCreators = {
  changePage,
  setUsername,
  login
}

const mapStateToProps = state => {
  return {
    username: state.loginForm.username,
    message: state.loginForm.message
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginForm))
