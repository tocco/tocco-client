import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import Login from '../components/Login'
import {checkSession} from '../modules/actions'

const mapActionCreators = {
  checkSession
}

const mapStateToProps = (state, props) => ({
  currentPage: state.login.currentPage,
  showTitle: props.showTitle
})

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(Login)))
