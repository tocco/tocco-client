import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import Login from '../components/Login'
import {initialized, login} from '../modules/actions'

const mapActionCreators = {
  login,
  initialized
}

const mapStateToProps = (state, props) => {
  return {
    currentPage: state.login.currentPage,
    showTitle: props.showTitle
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Login))

