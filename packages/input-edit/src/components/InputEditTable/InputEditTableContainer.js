import {connect} from 'react-redux'

import InputEditTable from './InputEditTable'
import {updateValue, setSorting} from '../../modules/inputEditTable/actions'

const mapActionCreators = {
  updateValue,
  setSorting
}

const mapStateToProps = state => {
  return {
    data: state.inputEditTable.data,
    inputDataForm: state.inputEditTable.inputDataForm,
    inputEditForm: state.inputEditTable.inputEditForm,
    sorting: state.inputEditTable.sorting
  }
}

export default connect(mapStateToProps, mapActionCreators)(InputEditTable)
