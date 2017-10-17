import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {
  initialize,
  updateRequestedCalendars,
  setDateRange
} from '../modules/resourceScheduler/actions'
import ResourceScheduler from '../components/ResourceScheduler'

const mapActionCreators = {
  initialize,
  updateRequestedCalendars,
  setDateRange
}

const mapStateToProps = (state, props) => {
  return {
    calendars: state.resourceScheduler.calendars,
    calendarTypes: state.resourceScheduler.calendarTypes
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ResourceScheduler))
