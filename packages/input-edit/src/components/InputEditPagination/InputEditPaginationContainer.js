import {connect} from 'react-redux'

import InputEditPagination from './InputEditPagination'
import {setCurrentPage} from '../../modules/inputEditPagination/actions'

const mapActionCreators = {
  setCurrentPage
}

const mapStateToProps = state => ({
  count: state.inputEditPagination.count,
  currentPage: state.inputEditPagination.currentPage,
  recordsPerPage: state.inputEditPagination.recordsPerPage
})

export default connect(mapStateToProps, mapActionCreators)(InputEditPagination)
