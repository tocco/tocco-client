import React from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '../FullCalendar'
import {consoleLogger} from 'tocco-util'

class Scheduler extends React.Component {
  events = []
  resources = []

  eventsTmp = [
    {
      id: '1',
      resourceId: 'c',
      start: '2017-10-11T06:00:00',
      end: '2017-10-11T011:00:00',
      title: 'Termin 1'
    },
    {
      id: '2',
      resourceId: 'b',
      start: '2017-10-11T08:00:00',
      end: '2017-10-11T011:00:00',
      title: 'Termin 2'
    },
    {
      id: '3',
      resourceId: 'c',
      start: '2017-10-11T06:00:00',
      end: '2017-10-11T14:00:00',
      title: 'Termin 3'
    }
  ]

  resourcesTmp = [
    {id: 'a', title: 'Dozent 1'},
    {id: 'b', title: 'Dozent 2'},
    {id: 'c', title: 'Raum A'},
    {id: 'd', title: 'Raum B'}
  ]

  show = () => {
    this.events = this.eventsTmp
    this.resources = this.resourcesTmp.slice(0, this.resources.length + 1)
    this.forceUpdate()
  }

  render() {
    return <div>
      <button onClick={this.show}>Show</button>
      <FullCalendar
        events={this.events}
        resources={this.resources}
        dateRangeChange={(start, end) => consoleLogger.log('Fullcalendar dateRangeChange:', start, end)}
        removeResource={resourceId => consoleLogger.log('FullCalendar removeResource:', resourceId)}
        locale="de"
      />
    </div>
  }
}

Scheduler.propTypes = {
  dateRangeChange: PropTypes.func,
  removeResource: PropTypes.func
}

export default Scheduler
