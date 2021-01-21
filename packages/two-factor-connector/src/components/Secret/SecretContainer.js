import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Secret from './Secret'
import {goToSecretVerification} from '../../modules/actions'

const mapActionCreators = {
  goToSecretVerification
}

const mapStateToProps = state => ({
  secret: state.twoFactorConnector.secret
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Secret))
