import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Verification from './Verification'
import {verifyCode} from '../../modules/actions'

const mapActionCreators = {
  verifyCode
}

const mapStateToProps = (state, props) => ({

})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Verification))
