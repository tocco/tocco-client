import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import SearchView from '../components/SearchView'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  searchFormType: state.entityList.searchFormType
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchView))
