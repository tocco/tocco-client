import {connect} from 'react-redux'
import {notifier} from 'tocco-app-extensions'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'
import {initializeSearch} from '../../modules/inputEditSearch/actions'
import {initializeInformation} from '../../modules/inputEditInformation/actions'
import {checkSelection} from '../../modules/inputEdit/actions'

const mapActionCreators = {
  checkSelection,
  initializeTable,
  initializeSearch,
  initializeInformation,
  notify: notifier.info
}

const mapStateToProps = state => ({
  selection: state.inputEdit.selection,
  validation: state.inputEdit.validation,
  actionDefinitions: state.inputEditTable.actionDefinitions
})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)
