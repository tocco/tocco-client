import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import RelationsView from './RelationsView'

const mapStateToProps = (state, props) => ({
  currentViewInfo: state.entities.path.currentViewInfo,
  relations: state.entities.path.relations
})

export default connect(mapStateToProps, null)(injectIntl(RelationsView))
