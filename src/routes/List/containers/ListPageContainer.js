import { connect } from 'react-redux'
import { fetchEntities } from '../modules/list'
import { updateSearchTerm } from '../modules/searchTerm'
import { setLiveSearch } from '../modules/liveSearch'
import { fetchForm } from '../../../modules/forms'

import ListPage from '../components/ListPage'

const mapActionCreators = {
  fetchEntities,
  updateSearchTerm,
  setLiveSearch,
  fetchForm
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    forms: state.forms
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPage)

