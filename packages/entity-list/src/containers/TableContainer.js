import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import Table from '../components/Table'
import {
  changePage,
  initialize,
  onRowClick,
  setSortingInteractive
} from '../modules/list/actions'
import {
  onSelectChange,
  setSelection
} from '../modules/selection/actions'
import {
  changePosition,
  resetSorting
} from '../modules/preferences/actions'

const mapActionCreators = {
  initialize,
  changePage,
  setSortingInteractive,
  onRowClick,
  onSelectChange,
  setSelection,
  changePosition,
  resetSorting
}

const mapStateToProps = (state, props) => ({
  currentPage: state.list.currentPage,
  entities: state.list.entities,
  entityCount: state.list.entityCount,
  limit: state.list.limit,
  inProgress: state.list.inProgress,
  tableSelectionStyle: state.selection.tableSelectionStyle,
  clickable: state.list.formClickable,
  selection: state.selection.selection,
  parent: state.entityList.parent,
  showLink: state.list.showLink,
  navigationStrategy: state.input.navigationStrategy,
  positions: state.preferences.positions,
  markable: state.list.entityModel.markable && state.list.formDefinition.markable
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Table))
