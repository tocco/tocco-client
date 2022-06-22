import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {reports} from 'tocco-app-extensions'

import MailingList from './MailingList'

const mapActionCreators = {
  loadReports: reports.loadReports
}

const mapStateToProps = state => ({
  searchFormType: state.input.searchFormType,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext,
  reports: state.reports.reports,
  reportIds: state.input.reportIds,
  showEmailAction: state.input.allowEmail
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(MailingList))
