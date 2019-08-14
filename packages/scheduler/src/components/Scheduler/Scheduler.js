import React from 'react'
import PropTypes from 'prop-types'

import FullCalendar from '../FullCalendar'
import {getEvents, getResources} from '../../utils/calendar'

class Scheduler extends React.Component {
  render() {
    return <div>
      <FullCalendar
        events={getEvents(this.props.calendars)}
        resources={getResources(this.props.calendars)}
        onDateRangeChange={this.props.onDateRangeChange}
        onCalendarRemove={this.props.onCalendarRemove}
        onEventClick={this.props.onEventClick}
        onRefresh={this.props.onRefresh}
        locale={this.props.locale}
        isLoading={this.props.isLoading}
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
          start: PropTypes.number,
          end: PropTypes.number,
          allDay: PropTypes.bool
        })
      ),
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired
    })).isRequired,
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func,
  onEventClick: PropTypes.func,
  onRefresh: PropTypes.func,
  locale: PropTypes.string,
  isLoading: PropTypes.bool
}

export default Scheduler
