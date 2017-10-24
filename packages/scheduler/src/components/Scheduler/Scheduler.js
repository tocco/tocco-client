import React from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '../FullCalendar'
import {getEvents, getResources} from './utils'

class Scheduler extends React.Component {
  render() {
    return <div>
      <FullCalendar
        events={getEvents(this.props.calendars)}
        resources={getResources(this.props.calendars)}
        onDateRangeChange={this.props.onDateRangeChange}
        onCalendarRemove={this.props.onCalendarRemove}
        onEventClick={this.props.onEventClick}
        locale={this.props.locale}
      />
    </div>
  }
}

Scheduler.propTypes = {
  calendars: PropTypes.arrayOf(
    PropTypes.shape({
      calendarType: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          start: PropTypes.string,
          end: PropTypes.string,
          allDay: PropTypes.bool
        })
      ),
      id: PropTypes.string.isRequred,
      label: PropTypes.string.isRequred,
      model: PropTypes.string.isRequred
    })).isRequired,
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func,
  onEventClick: PropTypes.func,
  locale: PropTypes.string
}

export default Scheduler
