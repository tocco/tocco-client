import {connect} from 'react-redux'
import {isDirty} from 'redux-form'

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
  searchFilters: state.searchForm.searchFilters,
  searchFormDirty: isDirty('searchForm')(state)
})

export default connect(mapStateToProps, mapActionCreators)(AdminSearchForm)
