import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {
  onDateRangeChange,
  onCalendarRemove
} from '../modules/scheduler/actions'
import Scheduler from '../components/Scheduler'

const mapActionCreators = {
  onDateRangeChange,
  onCalendarRemove
}

const mapStateToProps = (state, props) => {
  return {
    calendars: state.scheduler.calendars,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Scheduler))
