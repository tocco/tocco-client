import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MergeSummary from './MergeSummary'
import {close, openEntityList} from '../../modules/merge/actions'

const mapActionCreators = {
  close,
  openEntityList
}

const mapStateToProps = state => ({
  mergeResponse: state.merge.mergeResponse,
  navigationStrategy: state.input.navigationStrategy,
  isOldClient: !!state.input.isOldClient
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeSummary))
