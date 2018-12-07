import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import SelectionController from '../components/SelectionController'
import {setSelectionMode, clearSelection} from '../modules/selection/actions'

const mapActionCreators = {
  setSelectionMode,
  clearSelection
}

const mapStateToProps = (state, props) => (
  {
    selectionMode: state.selection.selectionMode,
    selection: state.selection.selection
  }
)

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SelectionController))
