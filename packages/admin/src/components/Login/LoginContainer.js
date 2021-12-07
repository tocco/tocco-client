import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {loginSuccessful, checkSsoAvailable} from '../../modules/session/actions'
import Login from './Login'

const mapActionCreators = {
  loginSuccessful,
  checkSsoAvailable
}

const mapStateToProps = (state, props) => ({
  ssoAvailable: state.session.ssoAvailable
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Login))
