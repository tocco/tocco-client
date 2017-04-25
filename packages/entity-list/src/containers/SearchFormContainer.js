import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'
import {setSearchInput, reset, setShowExtendedSearchForm, loadRelationEntity} from '../modules/searchForm/actions'

const mapActionCreators = {
  setSearchInput,
  loadRelationEntity,
  reset,
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
  preselectedSearchFields: state.searchForm.preselectedSearchFields
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))
