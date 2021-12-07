import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {goToSecretVerification} from '../../modules/actions'
import Secret from './Secret'

const mapActionCreators = {
  goToSecretVerification
}

const mapStateToProps = state => ({
  secret: state.twoFactorConnector.secret
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Secret))
