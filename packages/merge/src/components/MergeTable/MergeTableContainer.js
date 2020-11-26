import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import MergeTable from './MergeTable'
import {executeMerge} from '../../modules/merge/actions'

const mapActionCreators = {
  executeMerge
}

const mapStateToProps = (state, props) => ({
  sourceData: state.merge.sourceData
})

// eslint-disable-next-line no-undef
export default connect(mapStateToProps, mapActionCreators)(injectIntl(MergeTable))
