import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Login from './Login'
import {loginSuccessful, checkSsoAvailable} from '../../modules/session/actions'

const mapActionCreators = {
  loginSuccessful,
  checkSsoAvailable
}

const mapStateToProps = (state, props) => ({
  ssoAvailable: state.session.ssoAvailable
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Login))
