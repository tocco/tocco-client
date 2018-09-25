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
import {consoleLogger} from 'tocco-util'

import Conflict from '../Conflict'
import NavigationFullCalendar from '../NavigationFullCalendar'

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

  fixOptions = {
    schedulerLicenseKey: this.getLicense(),
    defaultView: 'timelineDay',
    header: false,
    editable: false,
    height: 'auto',
    resourceAreaWidth: '15%',
    timezone: 'local',
    eventClick: event => this.props.onEventClick(event),
    eventRender: (event, element) => {
      const time = event.start.twix(event.end).format({monthFormat: 'MMMM', dayFormat: 'Do'})
      const tooltipDescriptionContent = <div>
        <p>{event.description}</p>
        <p>{time}</p>
        <p><Conflict conflictStatus={event.conflict} intl={this.props.intl}/></p>
      </div>

      const content = ReactDOMServer.renderToString(tooltipDescriptionContent)

      window.jQuery(element).popover({
        title: event.title,
        animation: true,
        placement: 'bottom',
        trigger: 'hover',
        html: true,
        container: `.${this.state.wrapperId}`,
        content: `${content}`
      })
    }
  }

  resourceColumsRemoveButton = [
    {
      labelText: '',
      field: 'title',
      render: (resource, el) => {
        const button = document.createElement('button')
        button.innerHTML = '&#8722;'
        button.className = 'remove-resource-btn'
        button.onclick = () => this.props.onCalendarRemove(resource.entityKey, resource.calendarType)
        el.prepend(button)
      }
    }
  ]

  changeRange = () => {
    const view = this.calendarElement.fullCalendar('getView')

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
    this.calendarElement = $(this.calendarElementRef)
    this.calendarElement.fullCalendar(this.getFullCalendarOptions(this.props))
    this.changeRange()
    this.forceUpdate()
  }

  componentWillReceiveProps(newProps) {
    this.calendarElement.fullCalendar('option', this.getFullCalendarOptions(newProps))

    if (!_isEqual(newProps.events, this.props.events)) {
      this.calendarElement.fullCalendar('removeEventSources')
      this.calendarElement.fullCalendar('addEventSource', newProps.events)
    }

    if (!_isEqual(newProps.resources, this.props.resources)) {
      this.calendarElement.fullCalendar('refetchResources')
    }
  }

  changeView = (view = 'timelineDay') => {
    this.calendarElement.fullCalendar('changeView', view)
    this.changeRange()
  }

  render = () =>
    <div className={this.state.wrapperId}>
      { this.calendarElement
        && <NavigationFullCalendar
          changeRange={this.changeRange}
          changeView={this.changeView}
          chooseNext={() => this.calendarElement.fullCalendar('next')}
          choosePrev={() => this.calendarElement.fullCalendar('prev')}
          chooseToday={() => this.calendarElement.fullCalendar('today')}
          intl={this.props.intl}
          isLoading={this.props.isLoading}
          locale={this.props.locale}
          refresh={this.props.onRefresh}
          title={this.calendarElement.fullCalendar('getView').title}
          type={this.calendarElement.fullCalendar('getView').type}
        />
      }
      <div ref={ref => { this.calendarElementRef = ref }}></div>
    </div>
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
