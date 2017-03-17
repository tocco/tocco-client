import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'
import {loadRelationEntity} from '../../entity-browser/modules/actions'
import {setSearchInput, reset, setShowExtendedSearchForm} from '../modules/searchForm/actions'

const mapActionCreators = {
  setSearchInput,
  loadRelationEntity,
  reset,
  setShowExtendedSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  entityModel: state.entityBrowser.entityModel,
  relationEntities: state.entityBrowser.relationEntities,
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: state.searchForm.disableSimpleSearch,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.searchForm.preselectedSearchFields
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))

