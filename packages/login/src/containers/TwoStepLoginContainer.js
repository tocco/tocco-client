import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import TwoStepLoginForm from '../components/TwoStepLoginForm'
import {twoStepLogin} from '../modules/twoStepLogin/actions'

const mapActionCreators = {
  twoStepLogin
}

const mapStateToProps = state => ({
  username: state.login.username,
  password: state.login.password,
  loginPending: state.loginForm.loginPending
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(TwoStepLoginForm))
