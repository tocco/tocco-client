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
        locale="de"
      />
    </div>
  }
}

Scheduler.propTypes = {
  calendars: PropTypes.array.isRequired,
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func
}

export default Scheduler
