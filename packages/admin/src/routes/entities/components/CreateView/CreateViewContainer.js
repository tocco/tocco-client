import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import CreateView from './CreateView'

const mapActionCreators = {

  dispatchEmittedAction: actionEmitter.dispatchEmittedAction
}

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfo
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(CreateView))
