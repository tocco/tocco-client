import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import RelationsView from './RelationsView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfos[props.history.location.pathname],
  relations: state.entities.path.relations,
  relationsCount: state.entities.path.relationsCount
})

export default connect(mapStateToProps, null)(injectIntl(RelationsView))
