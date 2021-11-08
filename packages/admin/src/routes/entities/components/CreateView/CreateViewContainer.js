import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'
import {chooseDocument} from 'tocco-docs-browser/src/modules/chooseDocument/actions'

import CreateView from './CreateView'

const mapActionCreators = {
  chooseDocument,
  dispatchEmittedAction: actionEmitter.dispatchEmittedAction
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname]
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(CreateView))
