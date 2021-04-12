import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import DocsBrowser from './DocsBrowser'
import {loadBreadcrumbs, setSearchMode} from '../../modules/path/actions'
import {openDialog} from '../../modules/create/actions'

const mapStateToProps = state => ({
  searchMode: state.docs.path.searchMode,
  navigationStrategy: state.input.navigationStrategy,
  embedded: state.input.embedded
})

const mapActionCreators = {
  loadBreadcrumbs,
  setSearchMode,
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  openFileDialog: openDialog
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsBrowser))
