import { connect } from 'react-redux'
import { fetchEntities } from '../modules/list'
import { updateSearchTerm } from '../modules/searchTerm'
import { setLiveSearch } from '../modules/liveSearch'
import { setOrdering } from '../modules/ordering'
import { setEntityModel } from '../modules/entityModel'
import { fetchForm } from '../../../modules/forms'
import { requestEntityModels } from '../../../modules/entityModels'

import ListPage from '../components/ListPage'

const mapActionCreators = {
  fetchEntities,
  updateSearchTerm,
  setLiveSearch,
  setOrdering,
  fetchForm,
  setEntityModel,
  requestEntityModels
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    forms: state.forms,
    entityModels: state.entityModels
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPage)

