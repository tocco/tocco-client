import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import Test from './LoadUsernameMask'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  usernameOrPk: state.passwordUpdate.dialog.usernameOrPk
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Test))
