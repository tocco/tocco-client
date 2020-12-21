import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MergeSummary from './MergeSummary'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  mergeResponse: state.merge.mergeResponse
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeSummary))
