import {connect} from 'react-redux'
import {notification, actions} from 'tocco-app-extensions'

import {initializeSearch} from '../../modules/inputEditSearch/actions'
import {initializeTable} from '../../modules/inputEditTable/actions'
import InputEdit from './InputEdit'

const mapActionCreators = {
  initializeTable,
  initializeSearch,
  notify: notification.toaster,
  onActionClick: actions.actions.actionInvoke
}

const mapStateToProps = state => ({
  selection: state.input.selection,
  actionDefinitions: state.inputEditTable.actionDefinitions,
  handleNotifications: state.inputEdit.handleNotifications
})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)
