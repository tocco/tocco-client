import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import SelectionController from '../components/SelectionController'
import {clearSelection, toggleShowSelectedRecords} from '../modules/selection/actions'

const mapActionCreators = {
  clearSelection,
  toggleShowSelectedRecords
}

const mapStateToProps = (state, props) => (
  {
    queryCount: state.selection.queryCount,
    selection: state.selection.selection,
    showSelectedRecords: state.selection.showSelectedRecords
  }
)

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SelectionController))
