import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {executeMerge} from '../../modules/merge/actions'
import MergeTable from './MergeTable'

const mapActionCreators = {
  executeMerge
}

const mapStateToProps = state => ({
  sourceData: state.merge.sourceData,
  mergePending: state.merge.mergePending,
  mergeErrorMsg: state.merge.mergeErrorMsg,
  mergeValidationErrors: state.merge.mergeValidationErrors
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeTable))
