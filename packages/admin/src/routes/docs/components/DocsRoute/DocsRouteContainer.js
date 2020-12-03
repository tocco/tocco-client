import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import DocsRoute from './DocsRoute'
import {loadBreadcrumbs, setSearchMode} from '../../modules/path/actions'

const mapStateToProps = state => ({
  searchMode: state.docs.path.searchMode
})

const mapActionCreators = {
  loadBreadcrumbs,
  setSearchMode
}

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(DocsRoute)))
