import {connect} from 'react-redux'

import {fetchSpecificConfigEntityId, linkCreatedSpecificConfig, fireSuccess} from '../../modules/detailView'
import WidgetConfigDetailView from './WidgetConfigDetailView'

const mapActionCreators = {
  fetchSpecificConfigEntityId,
  linkCreatedSpecificConfig,
  fireSuccess
}

const mapStateToProps = state => ({
  specificConfigEntityId: state.detailView.specificConfigEntityId,
  linking: state.detailView.linking
})

export default connect(mapStateToProps, mapActionCreators)(WidgetConfigDetailView)
