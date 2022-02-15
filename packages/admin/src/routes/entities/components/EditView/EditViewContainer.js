import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'
import {chooseDocument} from 'tocco-docs-browser/src/main'

import {propagateRefresh, invalidateLastBreadcrumb} from '../../modules/path/actions'
import EditView from './EditView'

const mapActionCreators = {
  chooseDocument: chooseDocument.actions.chooseDocument,
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  propagateRefresh,
  invalidateLastBreadcrumb
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(EditView))
