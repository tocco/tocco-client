import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MergeSummary from './MergeSummary'
import {close} from '../../modules/merge/actions'

const mapActionCreators = {
  close
}

const mapStateToProps = state => ({
  mergeResponse: state.merge.mergeResponse,
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeSummary))
