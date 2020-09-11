import {connect} from 'react-redux'

import InputEditTable from './InputEditTable'
import {updateValue, setSorting} from '../../modules/inputEditTable/actions'
import {setCurrentPage} from '../../modules/inputEditPagination/actions'

const mapActionCreators = {
  updateValue,
  setSorting,
  setCurrentPage
}

const mapStateToProps = state => {
  return {
    data: state.inputEditTable.data,
    dataFormColumns: state.inputEditTable.dataFormColumns,
    inputEditForm: state.inputEditTable.inputEditForm,
    sorting: state.inputEditTable.sorting,
    dataLoadingInProgress: state.inputEditTable.dataLoadingInProgress,
    totalCount: state.inputEditPagination.totalCount,
    currentPage: state.inputEditPagination.currentPage,
    recordsPerPage: state.inputEditPagination.recordsPerPage
  }
}

export default connect(mapStateToProps, mapActionCreators)(InputEditTable)
