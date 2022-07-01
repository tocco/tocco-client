import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import MailingList from './MailingList'

const mapActionCreators = {}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext,
  reportIds: state.input.reportIds,
  showEmailAction: state.input.allowEmail
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MailingList))
