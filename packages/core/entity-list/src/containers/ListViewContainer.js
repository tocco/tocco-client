import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import ListView from '../components/ListView'
import {getFormDefinition, getSelectable} from '../util/api/forms'
import {showSelectionComponent} from '../util/selection'

const mapStateToProps = (state, props) => ({
  formDefinition: getFormDefinition(state),
  selection: state.selection.selection,
  currentPageIds: state.list.entities.map(e => e.__key),
  entityName: state.input.entityName,
  parent: state.input.parent,
  dataLoadingInProgress: state.list.inProgress,
  showSelectionController: showSelectionComponent(
    state.input.selectionStyle,
    state.input.disableSelectionController,
    getSelectable(getFormDefinition(state))
  ),
  searchFormPosition: state.input.searchFormPosition,
  showActions: state.input.showActions,
  sorting: state.list.sorting,
  sortable: state.input.sortable,
  columnDisplayPreferences: state.preferences.columns,
  preferencesLoaded: state.preferences.preferencesLoaded,
  cellRenderers: state.input.cellRenderers,
  tableMinHeight: state.input.tableMinHeight
})

export default connect(mapStateToProps, null)(injectIntl(ListView))
