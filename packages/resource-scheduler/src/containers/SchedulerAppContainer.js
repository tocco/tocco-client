import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {
  setDateRange,
  removeRequestedCalendar,
  onEventClick
} from '../modules/resourceScheduler/actions'

import SchedulerApp from 'tocco-scheduler/src/main'

const mapActionCreators = {
  onDateRangeChange: ({dateRange}) => setDateRange(dateRange),
  onCalendarRemove: ({calendarType, id}) => removeRequestedCalendar(calendarType, id),
  onEventClick: ({model, id}) => onEventClick(model, id)
}

const mapStateToProps = (state, props) => {
  return {
    calendars: state.resourceScheduler.calendars,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SchedulerApp))
