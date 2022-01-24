import {connect} from 'react-redux'
import {isDirty} from 'redux-form'

import {
  displaySearchFieldsModal,
  loadSearchAsQuery,
  resetDefaultSearchFilter,
  resetSearch,
  resetSearchFields,
  runQuery,
  saveDefaultSearchFilter,
  saveQueryAsFilter,
  saveSearchFilter,
  setQuery,
  setQueryViewVisible
} from '../../modules/searchForm/actions'
import AdminSearchForm from './AdminSearchForm'

const mapActionCreators = {
  resetSearch,
  saveSearchFilter,
  saveDefaultSearchFilter,
  resetDefaultSearchFilter,
  displaySearchFieldsModal,
  resetSearchFields,
  loadSearchAsQuery,
  saveQueryAsFilter,
  setQueryViewVisible,
  setQuery,
  runQuery
}

const mapStateToProps = (state, props) => ({
  initialized: state.searchForm.initialized,
  searchFilters: state.searchForm.searchFilters,
  searchFormDirty: isDirty('searchForm')(state),
  entityModel: state.entityList.entityName,
  queryViewVisible: state.searchForm.queryViewVisible,
  query: state.searchForm.query,
  queryError: state.searchForm.queryError
})

export default connect(mapStateToProps, mapActionCreators)(AdminSearchForm)
