import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {initialize as initializeSearchForm} from '../modules/searchForm/actions'
import SearchView from '../components/SearchView'
const mapActionCreators = {
  initializeSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormType: state.entityList.searchFormType
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchView))
