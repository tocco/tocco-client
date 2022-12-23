import {connect} from 'react-redux'

import {
  displayColumnModal,
  resetSorting,
  resetPreferences,
  resetColumns,
  displayTableRowsModal
} from '../../modules/preferences/actions'
import NavigationCellHeader from './NavigationCellHeader'

const mapActionCreators = {
  displayColumnModal,
  resetSorting,
  resetPreferences,
  resetColumns,
  displayTableRowsModal
}

const mapStateToProps = (state, props) => {
  return {
    sortable: state.list.sortable,
    disablePreferencesMenu: state.list.disablePreferencesMenu
  }
}

export default connect(mapStateToProps, mapActionCreators)(NavigationCellHeader)
