import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {
  initialize,
  updateRequestedCalendars,
  setDateRange,
  removeRequestedCalendar
} from '../modules/resourceScheduler/actions'
import ResourceScheduler from '../components/ResourceScheduler'

const mapActionCreators = {
  initialize,
  updateRequestedCalendars,
  setDateRange,
  removeRequestedCalendar
}

const mapStateToProps = state => {
  return {
    calendars: state.resourceScheduler.calendars,
    calendarTypes: state.resourceScheduler.calendarTypes,
    requestedCalendars: state.resourceScheduler.requestedCalendars,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ResourceScheduler))
