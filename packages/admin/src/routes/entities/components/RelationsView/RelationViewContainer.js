import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

import RelationsView from './RelationsView'
import {selectRelation} from '../../modules/path/actions'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  relations: state.entities.path.relations,
  relationsInfo: state.entities.path.relationsInfo,
  selectedRelation: state.entities.path.selectedRelation
})

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  selectRelation
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(RelationsView))
