import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'
import {
  initialize,
  submitSearchForm,
  resetSearch,
  setShowExtendedSearchForm,
  loadRelationEntity,
  loadSearchFilters
} from '../modules/searchForm/actions'

const mapActionCreators = {
  initializeSearchForm: initialize,
  submitSearchForm,
  loadRelationEntity,
  loadSearchFilters,
  resetSearch,
  setShowExtendedSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  entityModel: state.list.entityModel,
  relationEntities: state.searchForm.relationEntities,
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: state.searchForm.disableSimpleSearch,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.input.preselectedSearchFields,
  searchFilters: state.searchForm.searchFilter
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))
