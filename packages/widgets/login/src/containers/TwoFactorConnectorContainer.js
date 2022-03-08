import {connect} from 'react-redux'

import TwoFactorConnectorForm from '../components/TwoFactorConnectorForm'
import {changePage} from '../modules/login/actions'

const mapActionCreators = {
  changePage
}

const mapStateToProps = state => ({
  username: state.login.username,
  password: state.login.password,
  secret: state.twoStepLogin.secret
})

export default connect(mapStateToProps, mapActionCreators)(TwoFactorConnectorForm)
