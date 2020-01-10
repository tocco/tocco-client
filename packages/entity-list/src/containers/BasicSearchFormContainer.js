import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import BasicSearchForm from '../components/BasicSearchForm'
import {
  submitSearchForm,
  setShowExtendedSearchForm
} from '../modules/searchForm/actions'

const mapActionCreators = {
  submitSearchForm,
  setShowExtendedSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  entityModel: state.list.entityModel,
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: props.disableSimpleSearch || state.searchForm.disableSimpleSearch,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.input.preselectedSearchFields
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(BasicSearchForm))
