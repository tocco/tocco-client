import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import SelectionController from '../components/SelectionController'
import {setSelectionMode, clearSelection, toggleShowSelectedRecords} from '../modules/selection/actions'

const mapActionCreators = {
  setSelectionMode,
  clearSelection,
  toggleShowSelectedRecords
}

const mapStateToProps = (state, props) => (
  {
    selectionMode: state.selection.selectionMode,
    selection: state.selection.selection,
    showSelectedRecords: state.selection.showSelectedRecords
  }
)

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SelectionController))
