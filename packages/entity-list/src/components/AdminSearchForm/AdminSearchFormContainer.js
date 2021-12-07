import {connect} from 'react-redux'
import {isDirty} from 'redux-form'

import {
  displaySearchFieldsModal,
  resetDefaultSearchFilter,
  resetSearch,
  resetSearchFields,
  saveDefaultSearchFilter,
  saveSearchFilter
} from '../../modules/searchForm/actions'
import AdminSearchForm from './AdminSearchForm'

const mapActionCreators = {
  resetSearch,
  saveSearchFilter,
  saveDefaultSearchFilter,
  resetDefaultSearchFilter,
  displaySearchFieldsModal,
  resetSearchFields
}

const mapStateToProps = (state, props) => ({
  initialized: state.searchForm.initialized,
  searchFilters: state.searchForm.searchFilters,
  searchFormDirty: isDirty('searchForm')(state)
})

export default connect(mapStateToProps, mapActionCreators)(AdminSearchForm)
