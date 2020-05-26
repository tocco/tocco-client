import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {initialize, connectLogin} from '../../modules/actions'
import TwoFactorConnector from './TwoFactorConnector'

const mapActionCreators = {
  initialize,
  connectLogin
}

const mapStateToProps = (state, props) => ({
  twoFactorActive: state.twoFactorConnector.twoFactorActive,
  secret: state.twoFactorConnector.secret
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(TwoFactorConnector))
