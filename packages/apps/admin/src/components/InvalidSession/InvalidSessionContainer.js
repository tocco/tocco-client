import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import InvalidSession from './InvalidSession'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  invalidSession: state.session.invalidSession
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(InvalidSession))
