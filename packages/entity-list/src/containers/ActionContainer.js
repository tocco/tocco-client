import {connect} from 'react-redux'
import {actions} from 'tocco-app-extensions'

import {deriveSelectionFromState} from '../util/actions'

const mapStateToProps = (state, props) => ({
  selection: deriveSelectionFromState(state)
})

const mapActionCreators = {}

export default connect(mapStateToProps, mapActionCreators)(actions.Action)
