import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {close} from '../../modules/merge/actions'
import MergeSummary from './MergeSummary'

const mapActionCreators = {
  close
}

const mapStateToProps = state => ({
  mergeResponse: state.merge.mergeResponse,
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeSummary))
