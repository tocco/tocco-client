import {connect} from 'react-redux'

import InputEditTable from './InputEditTable'
import {updateValue, setSorting} from '../../modules/inputEditTable/actions'

const mapActionCreators = {
  updateValue,
  setSorting
}

const mapStateToProps = state => {
  return {
    data: state.inputEdit.data,
    inputDataForm: state.inputEdit.inputDataForm,
    inputEditForm: state.inputEdit.inputEditForm,
    sorting: state.inputEdit.sorting
  }
}

export default connect(mapStateToProps, mapActionCreators)(InputEditTable)
