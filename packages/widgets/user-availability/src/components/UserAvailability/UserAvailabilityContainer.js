import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import UserAvailability from './UserAvailability'

const mapActionCreators = {}

const mapStateToProps = state => ({
  reportIds: state.input.reportIds,
  allowCreate: state.input.allowCreate,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(UserAvailability))
