import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {
  onDateRangeChange,
  onCalendarRemove,
  onCalendarRemoveAll,
  onEventClick,
  onRefresh
} from '../modules/scheduler/actions'
import Scheduler from '../components/Scheduler'

const mapActionCreators = {
  onDateRangeChange,
  onCalendarRemove,
  onCalendarRemoveAll,
  onEventClick,
  onRefresh
}

const mapStateToProps = (state, props) => {
  return {
    calendars: state.scheduler.calendars,
    locale: state.intl.locale,
    isLoading: state.scheduler.isLoading
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Scheduler))
