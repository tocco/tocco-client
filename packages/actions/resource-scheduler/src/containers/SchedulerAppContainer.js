import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import SchedulerApp from 'tocco-scheduler/src/main'

import {
  setDateRange,
  removeRequestedCalendar,
  removeAllCalendars,
  onEventClick,
  onRefresh
} from '../modules/resourceScheduler/actions'

const mapActionCreators = {
  onDateRangeChange: ({dateRange}) => setDateRange(dateRange),
  onCalendarRemove: ({entityModel, id}) => removeRequestedCalendar(entityModel, id),
  onCalendarRemoveAll: removeAllCalendars,
  onEventClick: ({model, key}) => onEventClick(model, key),
  onRefresh
}

const mapStateToProps = (state, props) => {
  return {
    calendars: state.resourceScheduler.calendars,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SchedulerApp))
