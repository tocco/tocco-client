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
    dataFormColumns: state.inputEditTable.dataFormColumns,
    inputEditForm: state.inputEditTable.inputEditForm,
    sorting: state.inputEditTable.sorting,
    dataLoadingInProgress: state.inputEditTable.dataLoadingInProgress
  }
}

export default connect(mapStateToProps, mapActionCreators)(InputEditTable)
