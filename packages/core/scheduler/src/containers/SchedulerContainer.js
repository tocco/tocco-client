import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import Scheduler from '../components/Scheduler'
import {
  onDateRangeChange,
  onCalendarRemove,
  onCalendarRemoveAll,
  onEventClick,
  onRefresh
} from '../modules/scheduler/actions'

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
    isLoading: state.scheduler.isLoading,
    schedulerRef: state.input.schedulerRef
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Scheduler))
