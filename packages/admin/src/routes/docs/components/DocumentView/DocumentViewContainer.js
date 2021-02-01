import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'
import {actionEmitter} from 'tocco-app-extensions'

import DocumentView from './DocumentView'

const mapStateToProps = state => ({
  breadcrumbs: state.docs.path.breadcrumbs
})

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(DocumentView)))
