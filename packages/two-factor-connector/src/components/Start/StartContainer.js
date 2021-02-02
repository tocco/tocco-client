import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {initialize, requestSecret} from '../../modules/actions'
import Start from './Start'

const mapActionCreators = {
  initialize,
  requestSecret
}

const mapStateToProps = state => ({
  twoFactorActive: state.twoFactorConnector.twoFactorActive,
  secret: state.twoFactorConnector.secret,
  forced: state.input.forced
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Start))
