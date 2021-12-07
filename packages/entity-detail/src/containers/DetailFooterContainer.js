import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import DetailFooter from '../components/DetailFooter/DetailFooter'

const mapStateToProps = state => ({
  mode: state.entityDetail.mode,
  entity: state.entityDetail.entity,
  entityModel: state.entityDetail.entityModel
})

export default connect(mapStateToProps)(injectIntl(DetailFooter))
