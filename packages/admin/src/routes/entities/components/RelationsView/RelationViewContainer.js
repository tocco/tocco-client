import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {viewPersistor} from 'tocco-app-extensions'

import RelationsView from './RelationsView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  relations: state.entities.path.relations,
  relationsCount: state.entities.path.relationsCount,
  persistedViewInfo: viewPersistor.viewInfoSelector(state, props.history.location.pathname)
})

const mapActionCreators = {
  persistViewInfo: viewPersistor.persistViewInfo
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(RelationsView))
