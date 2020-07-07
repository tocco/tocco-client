import {connect} from 'react-redux'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'
import {initializeSearch} from '../../modules/inputEditSearch/actions'

const mapActionCreators = {
  initializeTable,
  initializeSearch
}

const mapStateToProps = state => ({
  entityKey: state.inputEdit.entityKey,
  inputDataForm: state.inputEditTable.inputDataForm
})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)
