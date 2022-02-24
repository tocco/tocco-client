import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'
import {chooseDocument} from 'tocco-docs-browser/src/main'

import CreateView from './CreateView'

const mapActionCreators = {
  chooseDocument: chooseDocument.actions.chooseDocument,
  dispatchEmittedAction: actionEmitter.dispatchEmittedAction
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(CreateView))
