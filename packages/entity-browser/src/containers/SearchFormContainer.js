import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'

import {setSearchInput, reset} from '../modules/searchForm/actions'

const mapActionCreators = {
  setSearchInput,
  reset
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  relationEntities: state.searchForm.relationEntities,
  entityModel: state.searchForm.entityModel,
  searchInputs: state.searchForm.searchInputs
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))

