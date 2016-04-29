import { connect } from 'react-redux'
import { fetchEvents } from '../modules/list'
import { updateSearchTerm } from '../modules/searchTerm'
import { setLiveSearch } from '../modules/liveSearch'
import { fetchForm } from '../modules/form'

import ListPage from '../components/ListPage'

const mapActionCreators = {
  fetchEvents,
  updateSearchTerm,
  setLiveSearch,
  fetchForm
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPage)

