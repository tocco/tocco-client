import React from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '../FullCalendar'
import {consoleLogger} from 'tocco-util'

class Scheduler extends React.Component {
  getResourceId = (id, model) => id + model
  getResources = calendars => {
    return calendars.map(calendar => ({title: calendar.label, id: this.getResourceId(calendar.id, calendar.model)}))
  }

  getEvents = calendars => {
    const events = []
    calendars.forEach(calendar => {
      calendar.events.forEach(event => {
        events.push({
          resourceId: this.getResourceId(calendar.id, calendar.model),
          title: event.label,
          start: event.start,
          end: event.end
        })
      })
    })

    return events
  }

  show = () => {
    this.events = this.eventsTmp
    this.resources = this.resourcesTmp.slice(0, this.resources.length + 1)
    this.forceUpdate()
  }

  render() {
    return <div>
      <FullCalendar
        events={this.getEvents(this.props.calendars)}
        resources={this.getResources(this.props.calendars)}
        onDateRangeChange={this.props.onDateRangeChange}
        removeResource={resourceId => consoleLogger.log('FullCalendar removeResource:', resourceId)}
        locale="de"
      />
    </div>
  }
}

Scheduler.propTypes = {
  calendars: PropTypes.array,
  onDateRangeChange: PropTypes.func,
  removeResource: PropTypes.func
}

export default Scheduler
