import { connect } from 'react-redux'
import { requestEntities, lazyLoading } from '../modules/data'
import { updateSearchTerm } from '../modules/searchTerm'
import { setOrdering } from '../modules/ordering'
import { setEntityModel } from '../modules/entityModel'
import { fetchForm } from '../../../modules/forms'
import { requestEntityModels } from '../../../modules/entityModels'

import ListPage from '../components/ListPage'

const mapActionCreators = {
  requestEntities,
  updateSearchTerm,
  setOrdering,
  fetchForm,
  setEntityModel,
  requestEntityModels,
  lazyLoading
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    forms: state.forms,
    entityModels: state.entityModels
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPage)

