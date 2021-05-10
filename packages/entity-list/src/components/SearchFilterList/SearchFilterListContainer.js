import {connect} from 'react-redux'

import SearchFilterList from './SearchFilterList'
import {setSearchFilterActive, executeSearch, deleteSearchFilter} from '../../modules/searchForm/actions'

const mapActionCreators = {
  setSearchFilterActive,
  executeSearch,
  deleteSearchFilter
}

const mapStateToProps = (state, props) => ({
  searchFilters: state.searchForm.searchFilters,
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(SearchFilterList)
