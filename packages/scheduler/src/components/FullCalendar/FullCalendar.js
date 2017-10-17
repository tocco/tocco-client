import React from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'

import $ from 'jquery'
import 'fullcalendar'
import 'fullcalendar-scheduler'
import 'fullcalendar/dist/locale/fr.js'
import 'fullcalendar/dist/locale/it.js'
import 'fullcalendar/dist/locale/de.js'

import '!style-loader!css-loader!fullcalendar/dist/fullcalendar.css'
import '!style-loader!css-loader!fullcalendar-scheduler/dist/scheduler.css'

class FullCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStartDate: null,
      currentEndDate: null
    }
  }

  fixOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    defaultView: 'timelineDay',
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'timelineDay,timelineWeek,timelineMonth'
    },
    editable: false,
    height: 'auto',
    resourceAreaWidth: '15%',
    eventColor: '#3a6ee1',
    eventBorderColor: '#2256c6',
    eventTextColor: '#000',
    resourceColumns: [
      {
        labelText: '',
        field: 'title',
        render: (resource, el) => {
          const button = document.createElement('button')
          button.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
          button.className = 'remove-resource-btn'
          button.onclick = () => this.props.removeResource(resource.id)
          el.append(button)
        }

      }
    ],
    viewRender: view => {
      this.handleDataChange(view)
    }
  }

  handleDataChange = view => {
    if (this.props.onDateRangeChange) {
      const startMoment = view.start
      const endMoment = view.end
      if (!startMoment.isSame(this.state.currentStartDate) || !endMoment.isSame(this.state.currentEndDate)) {
        this.props.onDateRangeChange({startDate: startMoment._d, endDate: endMoment._d})
        this.setState({currentStartDate: startMoment, currentEndDate: endMoment})
      }
    }
  }

  getFullCalendarOptions = props => {
    const {locale, resources} = props
    return {...this.fixOptions, locale, resources}
  }

  componentDidMount() {
    this.calendar = $(this.calendarContainer)
    this.calendar.fullCalendar(this.getFullCalendarOptions(this.props))
  }

  componentWillReceiveProps(newProps) {
    this.calendar.fullCalendar('option', this.getFullCalendarOptions(newProps))

    if (!_isEqual(newProps.events, this.props.events)) {
      this.calendar.fullCalendar('removeEventSources')
      this.calendar.fullCalendar('addEventSource', newProps.events)
    }

    if (!_isEqual(newProps.resources, this.props.resources)) {
      this.calendar.fullCalendar('refetchResources')
    }
  }

  render() {
    return <div ref={ref => { this.calendarContainer = ref }}></div>
  }
}

FullCalendar.defaultProps = {
  events: [],
  resources: [],
  locale: 'en'
}

FullCalendar.propTypes = {
  onDateRangeChange: PropTypes.func,
  removeResource: PropTypes.func.isRequired,
  events: PropTypes.array,
  resources: PropTypes.array,
  locale: PropTypes.string
}

export default FullCalendar
