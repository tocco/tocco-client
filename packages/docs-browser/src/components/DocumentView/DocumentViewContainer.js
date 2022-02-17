import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'

import {withRouterTypeCompProvider} from '../../utils/withRouterTypeCompProvider'
import DocumentView from './DocumentView'

const mapStateToProps = state => ({
  breadcrumbs: state.docs.path.breadcrumbs,
  formName: state.input.documentDetailFormName,
  locale: state.intl.locale
})

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

export default withRouterTypeCompProvider(connect(mapStateToProps, mapActionCreators)(injectIntl(DocumentView)))
