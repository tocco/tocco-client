import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'
import {actionEmitter} from 'tocco-app-extensions'

import DocsRoute from './DocsRoute'
import {loadBreadcrumbs, setSearchMode} from '../../modules/path/actions'
import {openDialog} from '../../modules/create/actions'

const mapStateToProps = state => ({
  searchMode: state.docs.path.searchMode
})

const mapActionCreators = {
  loadBreadcrumbs,
  setSearchMode,
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  openFileDialog: openDialog
}

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(DocsRoute)))
