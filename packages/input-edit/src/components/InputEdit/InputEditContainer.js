import {connect} from 'react-redux'
import {notification} from 'tocco-app-extensions'

import {updateSelection} from '../../modules/inputEdit/actions'
import {initializeInformation} from '../../modules/inputEditInformation/actions'
import {initializeSearch} from '../../modules/inputEditSearch/actions'
import {initializeTable} from '../../modules/inputEditTable/actions'
import InputEdit from './InputEdit'

const mapActionCreators = {
  updateSelection,
  initializeTable,
  initializeSearch,
  initializeInformation,
  notify: notification.toaster
}

const mapStateToProps = state => ({
  selection: state.inputEdit.selection,
  actionDefinitions: state.inputEditTable.actionDefinitions,
  handleNotifications: state.inputEdit.handleNotifications
})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)
