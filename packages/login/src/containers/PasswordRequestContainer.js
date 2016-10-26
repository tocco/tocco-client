import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import PasswordRequest from '../components/PasswordRequest'

import {changePage} from '../modules/login/actions'
import {requestPassword} from '../modules/passwordRequest/actions'

const mapActionCreators = {
  changePage,
  requestPassword
}

const mapStateToProps = state => ({
  pending: state.loginForm.loginPending
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PasswordRequest))
