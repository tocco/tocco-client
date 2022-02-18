import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import BasicSearchForm from '../components/BasicSearchForm'
import {submitSearchForm, setShowExtendedSearchForm} from '../modules/searchForm/actions'
import searchFormTypes from '../util/searchFormTypes'

const mapActionCreators = {
  submitSearchForm,
  setShowExtendedSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  entityModel: state.list.entityModel,
  searchInputs: state.searchForm.searchInputs,
  searchFormType: state.entityList.searchFormType,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: [searchFormTypes.ADVANCED, searchFormTypes.ADMIN].includes(state.entityList.searchFormType)
    || state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.input.preselectedSearchFields
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(BasicSearchForm))
