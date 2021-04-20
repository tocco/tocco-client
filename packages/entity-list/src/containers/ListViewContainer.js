import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import ListView from '../components/ListView'

const mapStateToProps = (state, props) => ({
  formDefinition: state.list.formDefinition,
  selection: state.selection.selection,
  currentPageIds: state.list.entities.map(e => e.__key),
  entityName: state.entityList.entityName,
  parent: state.entityList.parent,
  dataLoadingInProgress: state.list.inProgress,
  showSelectionController: state.selection.showSelectionController,
  searchFormPosition: state.input.searchFormPosition,
  showActions: state.input.showActions,
  sorting: state.list.sorting,
  columnDisplayPreferences: state.preferences.columns,
  preferencesLoaded: state.preferences.preferencesLoaded,
  cellRenderers: state.input.cellRenderers
})

export default connect(mapStateToProps, null)(injectIntl(ListView))
