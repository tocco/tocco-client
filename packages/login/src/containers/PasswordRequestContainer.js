import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import PasswordRequest from '../components/PasswordRequest'

import {changePage} from '../modules/login/actions'

const mapActionCreators = {
  changePage
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PasswordRequest))
