import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {
  onDateRangeChange
} from '../modules/scheduler/actions'
import Scheduler from '../components/Scheduler'

const mapActionCreators = {
  onDateRangeChange
}

const mapStateToProps = (state, props) => {
  return {
    calendars: state.scheduler.calendars
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(Scheduler))
