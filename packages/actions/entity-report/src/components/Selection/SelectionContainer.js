import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {loadReports, openReportAction, setSelectedReport} from '../../modules/entityReport/actions'
import Selection from './Selection'

const mapActionCreators = {
  loadReports,
  openReportAction,
  setSelectedReport
}

const mapStateToProps = state => ({
  reports: state.entityReport.reports,
  selectedReport: state.entityReport.selectedReport
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Selection))
