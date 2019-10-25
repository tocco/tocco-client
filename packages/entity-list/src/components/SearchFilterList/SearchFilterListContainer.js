import {connect} from 'react-redux'

import SearchFilterList from './SearchFilterList'
import {setSearchFilterActive, executeSearch} from '../../modules/searchForm/actions'

const mapActionCreators = {
  setSearchFilterActive,
  executeSearch
}

const mapStateToProps = (state, props) => ({
  searchFilters: state.searchForm.searchFilters
})

export default connect(mapStateToProps, mapActionCreators)(SearchFilterList)
