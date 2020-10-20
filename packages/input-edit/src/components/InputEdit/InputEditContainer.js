import {connect} from 'react-redux'
import {notifier} from 'tocco-app-extensions'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'
import {initializeSearch} from '../../modules/inputEditSearch/actions'
import {initializeInformation} from '../../modules/inputEditInformation/actions'
import {updateSelection} from '../../modules/inputEdit/actions'

const mapActionCreators = {
  updateSelection,
  initializeTable,
  initializeSearch,
  initializeInformation,
  notify: notifier.info
}

const mapStateToProps = state => ({
  selection: state.inputEdit.selection,
  actionDefinitions: state.inputEditTable.actionDefinitions,
  handleNotifications: state.inputEdit.handleNotifications
})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)
