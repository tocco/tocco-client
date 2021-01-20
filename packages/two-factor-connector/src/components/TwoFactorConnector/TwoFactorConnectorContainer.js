import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {initialize} from '../../modules/actions'
import TwoFactorConnector from './TwoFactorConnector'

const mapActionCreators = {
  initialize
}

const mapStateToProps = state => ({
  stage: state.twoFactorConnector.stage
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(TwoFactorConnector))
