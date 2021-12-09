import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'

import {openDialog} from '../../modules/create/actions'
import {loadBreadcrumbs, setSearchMode} from '../../modules/path/actions'
import DocsBrowser from './DocsBrowser'

const mapStateToProps = state => ({
  searchMode: state.docs.path.searchMode,
  navigationStrategy: state.input.navigationStrategy,
  embedded: state.input.embedded,
  noLeftPadding: state.input.noLeftPadding,
  scrollBehaviour: state.docs.list.scrollBehaviour
})

const mapActionCreators = {
  loadBreadcrumbs,
  setSearchMode,
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  openFileDialog: openDialog
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocsBrowser))
