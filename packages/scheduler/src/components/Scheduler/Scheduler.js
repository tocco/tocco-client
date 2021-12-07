import PropTypes from 'prop-types'
import React from 'react'

import {getEvents, getResources} from '../../utils/calendar'
import FullCalendar from '../FullCalendar'

const Scheduler = props => (
  <FullCalendar
    events={getEvents(props.calendars)}
    resources={getResources(props.calendars)}
    onDateRangeChange={props.onDateRangeChange}
    onCalendarRemove={props.onCalendarRemove}
    onCalendarRemoveAll={props.onCalendarRemoveAll}
    onEventClick={props.onEventClick}
    onRefresh={props.onRefresh}
    locale={props.locale}
    isLoading={props.isLoading}
  />
)

Scheduler.propTypes = {
  calendars: PropTypes.arrayOf(
    PropTypes.shape({
      calendarType: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          start: PropTypes.number,
          end: PropTypes.number,
          allDay: PropTypes.bool
        })
      ),
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired
    })
  ).isRequired,
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func,
  onCalendarRemoveAll: PropTypes.func,
  onEventClick: PropTypes.func,
  onRefresh: PropTypes.func,
  locale: PropTypes.string,
  isLoading: PropTypes.bool
}

export default Scheduler
