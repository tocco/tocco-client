import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Login from '../components/Login'

const mapActionCreators = {}

const mapStateToProps = (state, props) => {
  return {
    currentPage: state.login.currentPage,
    headless: props.headless
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Login))
