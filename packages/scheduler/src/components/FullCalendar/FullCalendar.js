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
    viewRender: view => {
      this.handleDataChange(view)
    }
  }

  resourceColumsRemoveButton = [
    {
      labelText: '',
      field: 'title',
      render: (resource, el) => {
        const button = document.createElement('button')
        button.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
        button.className = 'remove-resource-btn'
        button.onclick = () => this.props.onCalendarRemove(resource.entityId, resource.calendarType)
        el.append(button)
      }
    }
  ]

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

    const dynamicOptions = {}
    if (this.props.onCalendarRemove) {
      dynamicOptions.resourceColumns = this.resourceColumsRemoveButton
    }

    return {...this.fixOptions, ...dynamicOptions, locale, resources}
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
  onCalendarRemove: PropTypes.func,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      resourceId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      allDay: PropTypes.bool
    }
    )),
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      calendarType: PropTypes.string.isRequired,
      entityId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }
    )),
  locale: PropTypes.string
}

export default FullCalendar
