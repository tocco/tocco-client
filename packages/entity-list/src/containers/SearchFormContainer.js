import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import SearchForm from '../components/SearchForm'
import {
  submitSearchForm,
  resetSearch,
  setShowExtendedSearchForm
} from '../modules/searchForm/actions'

const mapActionCreators = {
  submitSearchForm,
  resetSearch,
  setShowExtendedSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  entityModel: state.list.entityModel,
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: state.searchForm.disableSimpleSearch,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.input.preselectedSearchFields
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))
