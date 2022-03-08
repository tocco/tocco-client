import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {verifyCode} from '../../modules/actions'
import Verification from './Verification'

const mapActionCreators = {
  verifyCode
}

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Verification))
