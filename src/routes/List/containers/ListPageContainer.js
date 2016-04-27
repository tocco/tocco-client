import { connect } from 'react-redux'
import { fetchEvents } from '../modules/list'
import { updateSearchTerm } from '../modules/searchTerm'

import ListPage from '../components/ListPage'

const mapActionCreators = {
  fetchEvents,
  updateSearchTerm
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPage)

