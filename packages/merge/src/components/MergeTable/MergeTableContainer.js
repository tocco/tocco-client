import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MergeTable from './MergeTable'
import {executeMerge} from '../../modules/merge/actions'

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
