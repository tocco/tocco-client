import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {actionEmitter} from 'tocco-app-extensions'

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
  removeRequestedCalendar,
  emitAction: action => actionEmitter.dispatchEmittedAction(action)
}

const mapStateToProps = state => {
  return {
    calendars: state.resourceScheduler.calendars,
    calendarTypes: state.resourceScheduler.calendarTypes,
    requestedCalendars: state.resourceScheduler.requestedCalendars,
    handleNotifications: state.resourceScheduler.handleNotifications,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ResourceScheduler))
