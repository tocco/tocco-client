import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {reports} from 'tocco-app-extensions'

import ReservationLecturerBookingView from './ReservationLecturerBookingView'

const mapActionCreators = {
  loadReports: reports.loadReports
}

const mapStateToProps = state => ({
  reports: state.reports.reports,
  reportIds: state.input.reportIds,
  searchFormType: state.input.searchFormType,
  searchFilters: state.input.searchFilters,
  limit: state.input.limit,
  backendUrl: state.input.backendUrl,
  businessUnit: state.input.businessUnit,
  appContext: state.input.appContext
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ReservationLecturerBookingView))
