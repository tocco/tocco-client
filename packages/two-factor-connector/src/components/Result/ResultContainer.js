import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {success, goToStart} from '../../modules/actions'
import Result from './Result'

const mapActionCreators = {
  success,
  goToStart
}

const mapStateToProps = (state, props) => ({
  setupSuccessful: state.twoFactorConnector.setupSuccessful
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Result))
