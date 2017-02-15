import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'

import {setSearchInput, reset, setShowExtendedSearchForm, setSimpleSearchFields} from '../modules/searchForm/actions'

const mapActionCreators = {
  setSearchInput,
  reset,
  setShowExtendedSearchForm,
  setSimpleSearchFields
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  relationEntities: state.searchForm.relationEntities,
  entityModel: state.entityBrowser.entityModel,
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: state.entityBrowser.disableSimpleSearch,
  simpleSearchFields: state.entityBrowser.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))

