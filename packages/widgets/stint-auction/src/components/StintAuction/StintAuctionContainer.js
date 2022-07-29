import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import StintAuction from './StintAuction'

const mapActionCreators = {}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext,
  reportIds: state.input.reportIds
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(StintAuction))
