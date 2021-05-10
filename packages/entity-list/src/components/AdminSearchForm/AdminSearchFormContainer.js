import {connect} from 'react-redux'

import AdminSearchForm from './AdminSearchForm'
import {
  resetSearch,
  saveSearchFilter
} from '../../modules/searchForm/actions'

const mapActionCreators = {
  resetSearch,
  saveSearchFilter
}

const mapStateToProps = (state, props) => ({
  searchFilters: state.searchForm.searchFilters
})

export default connect(mapStateToProps, mapActionCreators)(AdminSearchForm)
