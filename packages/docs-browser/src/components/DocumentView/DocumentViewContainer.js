import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import DocumentView from './DocumentView'

const mapStateToProps = state => ({
  breadcrumbs: state.docs.path.breadcrumbs,
  formName: state.input.documentDetailFormName,
  locale: state.intl.locale
})

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DocumentView))
