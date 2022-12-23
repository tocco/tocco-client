import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import Table from '../components/Table'
import {changePage, refresh, initialize, onRowClick, setSortingInteractive} from '../modules/list/actions'
import {changePosition, resetSorting, changeWidth} from '../modules/preferences/actions'
import {onSelectChange, setSelection} from '../modules/selection/actions'
import {getFormDefinition, getClickable, getDisablePreferencesMenu, getSelectable} from '../util/api/forms'
import {getTableSelectionStyle} from '../util/selection'

const mapActionCreators = {
  initialize,
  changePage,
  refresh,
  setSortingInteractive,
  onRowClick,
  onSelectChange,
  setSelection,
  changePosition,
  resetSorting,
  changeWidth
}

const mapStateToProps = (state, props) => ({
  currentPage: state.list.currentPage,
  entities: state.list.entities,
  entityCount: state.list.entityCount,
  limit: state.preferences.numOfRows || state.input.limit,
  inProgress: state.list.inProgress,
  tableSelectionStyle: getTableSelectionStyle(state.input.selectionStyle, getSelectable(getFormDefinition(state))),
  clickable: getClickable(getFormDefinition(state)),
  selection: state.selection.selection,
  selectionFilterFn: state.input.selectionFilterFn,
  parent: state.input.parent,
  showLink: state.input.showLink,
  navigationStrategy: state.input.navigationStrategy,
  positions: state.preferences.positions,
  widths: state.preferences.widths,
  markable: state.list.entityModel.markable && state.list.formDefinition.markable,
  disablePreferencesMenu: getDisablePreferencesMenu(getFormDefinition(state)),
  scrollBehaviour: state.input.scrollBehaviour
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Table))
