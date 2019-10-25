import {connect} from 'react-redux'

import AdminSearchForm from './AdminSearchForm'

const mapActionCreators = {
}

const mapStateToProps = (state, props) => ({
  searchFilters: state.searchForm.searchFilters
})

export default connect(mapStateToProps, mapActionCreators)(AdminSearchForm)
