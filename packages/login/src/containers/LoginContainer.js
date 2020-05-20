import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import Login from '../components/Login'
import {initialize} from '../modules/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => ({
  currentPage: props.currentPage || state.login.currentPage,
  showTitle: props.showTitle,
  captchaKey: state.login.captchaKey
})

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(Login)))
