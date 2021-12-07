import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import SearchView from '../components/SearchView'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  searchFormType: state.entityList.searchFormType
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchView))
