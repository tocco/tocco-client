import {connect} from 'react-redux'

import InputEdit from './InputEdit'
import {initializeTable} from '../../modules/inputEditTable/actions'
import {initializeSearch} from '../../modules/inputEditSearch/actions'

const mapActionCreators = {
  initializeTable,
  initializeSearch
}

const mapStateToProps = state => ({
  inputEntityKey: state.input.inputEntityKey
})

export default connect(mapStateToProps, mapActionCreators)(InputEdit)
