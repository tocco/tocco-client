import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {setSelectedMultiple, setSelectedMultipleAll, setSelectedSingle} from '../../modules/merge/actions'
import CellRenderer from './CellRender'

const mapActionCreatorsCell = {
  setSelectedSingle,
  setSelectedMultiple,
  setSelectedMultipleAll
}
const mapStateToPropsCell = state => ({
  selectedSingle: state.merge.selected.single,
  selectedMultiple: state.merge.selected.multiple,
  selectedMultipleAll: state.merge.selected.multipleAll,
  navigationStrategy: state.input.navigationStrategy
})
export default connect(mapStateToPropsCell, mapActionCreatorsCell)(injectIntl(CellRenderer))
