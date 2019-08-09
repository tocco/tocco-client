import {connect} from 'react-redux'

import LoginBox from '../components/LoginBox'
import * as actions from '../modules/actions'

const mapActionCreators = {
  loadProviders: actions.loadProviders,
  loginCompleted: actions.loginCompleted
}

const mapStateToProps = state => {
  return {
    providers: state.ssoLogin.providers,
    loginEndpoint: state.input.ssoLoginEndpoint,
    autoLogin: state.input.autoLogin
  }
}

export default connect(mapStateToProps, mapActionCreators)(LoginBox)
