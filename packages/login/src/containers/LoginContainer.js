import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Login from '../components/Login'
import {initialize} from '../modules/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => ({
  currentPage: props.currentPage || state.login.currentPage,
  showTitle: props.showTitle
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Login))
