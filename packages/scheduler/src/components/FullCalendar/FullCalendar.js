import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'

import $ from 'jquery'
import 'jquery/src/jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'twix'
import 'fullcalendar'
import 'fullcalendar-scheduler'
import 'fullcalendar/dist/locale/fr.js'
import 'fullcalendar/dist/locale/it.js'
import 'fullcalendar/dist/locale/de.js'

import '!style-loader!css-loader!fullcalendar/dist/fullcalendar.css'
import '!style-loader!css-loader!fullcalendar-scheduler/dist/scheduler.css'
import {injectIntl, intlShape} from 'react-intl'
import Conflict from '../Conflict'
import {consoleLogger} from 'tocco-util'

class FullCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStartDate: null,
      currentEndDate: null,
      wrapperId: new Date().getTime()
    }
  }

  getLicense = () => {
    try {
      return require('./license').key
    } catch (e) {
      consoleLogger.logWarning('This Version runs with the NonCommercial FullCalendar license.')
      return 'CC-Attribution-NonCommercial-NoDerivatives' // noncommercial license
    }
  }

  getRefreshButton = isLoading => ({
    bootstrapGlyphicon: 'glyphicon-refresh' + (isLoading ? ' fa-spin' : ''),
    click: () => {
      if (!isLoading) {
        this.props.onRefresh()
      }
    }
  })

  fixOptions = {
    customButtons: {
      refresh: this.getRefreshButton(false)
    },
    schedulerLicenseKey: this.getLicense(),
    defaultView: 'timelineDay',
    header: {
      left: 'today prev,next refresh',
      center: 'title',
      right: 'timelineDay,timelineWeek,timelineMonth'
    },
    editable: false,
    height: 'auto',
    resourceAreaWidth: '15%',
    timezone: 'local',
    themeSystem: 'bootstrap3',
    viewRender: view => {
      this.handleDataChange(view)
    },
    eventClick: event => this.props.onEventClick(event),
    eventRender: (event, element) => {
      const reservation = event.start.twix(event.end).format({monthFormat: 'MMMM', dayFormat: 'Do'})
      const tooltipContent1 = <p dangerouslySetInnerHTML={{__html: `
        <p>${event.description}</p>
        <p>
          <i class="fa fa-clock-o" style="padding-right:10px" aria-hidden="true"></i>${reservation}
        </p>`
      }} />

      const tooltipContent2 = <p><Conflict conflictStatus={event.conflict} intl={this.props.intl}/></p>

      window.jQuery(element).popover({
        title: event.title,
        animation: true,
        placement: 'bottom',
        trigger: 'hover',
        html: true,
        container: `.${this.state.wrapperId}`,
        content: `
          <div>
            ${ReactDOMServer.renderToString(tooltipContent1)}${ReactDOMServer.renderToString(tooltipContent2)}
          </div>`
      })
    }
  }

  resourceColumsRemoveButton = [
    {
      labelText: '',
      field: 'title',
      render: (resource, el) => {
        const button = document.createElement('button')
        button.innerHTML = '<span class="fa fa-minus-circle" aria-hidden="true"></span>'
        button.className = 'remove-resource-btn'
        button.onclick = () => this.props.onCalendarRemove(resource.entityKey, resource.calendarType)
        el.prepend(button)
      }
    }
  ]

  handleDataChange = view => {
    if (this.props.onDateRangeChange) {
      const startMoment = view.start
      const endMoment = view.end
      if (!startMoment.isSame(this.state.currentStartDate) || !endMoment.isSame(this.state.currentEndDate)) {
        this.props.onDateRangeChange({startDate: startMoment._d, endDate: endMoment._d})
        this.setState({...this.state, currentStartDate: startMoment, currentEndDate: endMoment})
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

    this.calendar.fullCalendar('option', 'customButtons', {
      refresh: this.getRefreshButton(newProps.isLoading)
    })
  }

  render = () =>
    <div className={this.state.wrapperId}><div ref={ref => { this.calendarContainer = ref }}></div></div>
}

FullCalendar.defaultProps = {
  events: [],
  resources: [],
  locale: 'en'
}

FullCalendar.propTypes = {
  intl: intlShape.isRequired,
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func,
  onRefresh: PropTypes.func,
  onEventClick: PropTypes.func,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      resourceId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      allDay: PropTypes.bool
    }
    )),
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      calendarType: PropTypes.string.isRequired,
      entityKey: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }
    )),
  locale: PropTypes.string,
  isLoading: PropTypes.bool
}

export default injectIntl(FullCalendar)
