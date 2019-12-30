import {connect} from 'react-redux'

import AdminSearchForm from './AdminSearchForm'
import {
  resetSearch
} from '../../modules/searchForm/actions'

const mapActionCreators = {
  resetSearch
}

const mapStateToProps = (state, props) => ({
  searchFilters: state.searchForm.searchFilters
})

export default connect(mapStateToProps, mapActionCreators)(AdminSearchForm)
