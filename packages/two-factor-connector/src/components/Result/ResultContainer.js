import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Result from './Result'

const mapActionCreators = {
}

const mapStateToProps = (state, props) => ({
  secret: state.twoFactorConnector.secret
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Result))
