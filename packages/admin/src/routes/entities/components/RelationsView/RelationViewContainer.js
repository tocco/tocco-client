import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {actionEmitter} from 'tocco-app-extensions'

import {selectRelation} from '../../modules/path/actions'
import RelationsView from './RelationsView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.location.pathname],
  relations: state.entities.path.relations,
  relationsInfo: state.entities.path.relationsInfo,
  selectedRelation: state.entities.path.selectedRelation
})

const mapActionCreators = {
  emitAction: action => actionEmitter.dispatchEmittedAction(action),
  selectRelation
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(RelationsView))
