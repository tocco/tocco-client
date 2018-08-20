import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'
import {
  submitSearchForm,
  resetSearch,
  setShowExtendedSearchForm,
  loadSearchFilters,
  advancedSearchUpdate
} from '../modules/searchForm/actions'
import {formData} from 'tocco-util'

const mapActionCreators = {
  submitSearchForm,
  loadSearchFilters,
  resetSearch,
  setShowExtendedSearchForm,
  loadRelationEntities: formData.loadRelationEntities,
  loadTooltip: formData.loadTooltip,
  openAdvancedSearch: (...args) =>
    formData.openAdvancedSearch(require('./../main').default, advancedSearchUpdate, ...args)
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  entityModel: state.list.entityModel,
  relationEntities: formData.relationEntitiesSelector(state),
  tooltips: formData.tooltipSelector(state),
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: state.searchForm.disableSimpleSearch,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.input.preselectedSearchFields,
  searchFilters: state.searchForm.searchFilter
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))
