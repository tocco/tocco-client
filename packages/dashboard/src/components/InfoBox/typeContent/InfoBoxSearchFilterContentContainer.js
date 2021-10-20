import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import InfoBoxSearchFilterContent from './InfoBoxSearchFilterContent'

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const mapStateToProps = state => ({
  navigationStrategy: state.input.navigationStrategy
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(InfoBoxSearchFilterContent))
