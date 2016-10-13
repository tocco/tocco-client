import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import LoginForm from '../components/LoginForm'
import {changePage} from '../modules/login/actions'
import {login} from '../modules/actions'

const mapActionCreators = {
  changePage,
  login
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(LoginForm))
