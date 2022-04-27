import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {reports} from 'tocco-app-extensions'

import WageView from './WageView'

const mapActionCreators = {
  loadReports: reports.loadReports
}

const mapStateToProps = state => ({
  reports: state.reports.reports,
  reportIds: state.input.reportIds,
  allowCreate: state.input.allowCreate,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(WageView))
