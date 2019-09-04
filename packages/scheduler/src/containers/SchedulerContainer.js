import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {hot} from 'react-hot-loader/root'

import {
  onDateRangeChange,
  onCalendarRemove,
  onEventClick,
  onRefresh
} from '../modules/scheduler/actions'
import Scheduler from '../components/Scheduler'

const mapActionCreators = {
  onDateRangeChange,
  onCalendarRemove,
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

export default hot(connect(mapStateToProps, mapActionCreators)(injectIntl(Scheduler)))
