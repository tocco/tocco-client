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
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import {consoleLogger} from 'tocco-util'
import {Typography, Button} from 'tocco-ui'

import Conflict from '../Conflict'

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
        button.innerHTML = '<span class="fa fa-minus-circle" aria-hidden="true"></span>'
        button.className = 'remove-resource-btn'
        button.onclick = () => this.props.onCalendarRemove(resource.entityKey, resource.calendarType)
        el.prepend(button)
      }
    }
  ]

  handleRangeChange = () => {
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
    this.calendar = this.calendarElement.fullCalendar('getCalendar')
    this.handleRangeChange()
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
    this.handleRangeChange()
  }

  getButtonLookProps = viewType => {
    const currentViewType = this.calendarElement ? this.calendarElement.fullCalendar('getView').type : ''

    if (currentViewType === viewType) {
      return {look: 'raised'}
    }

    return {}
  }

  msg = (id, values = {}) => (this.props.intl.formatMessage({id}, values))

  render = () => {
    // TODO: Remove ternary operator as soon as Child is no more a required prop
    const title = this.calendarElement
      ? <Typography.B>{this.calendarElement.fullCalendar('getView').title}</Typography.B> : null
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
          <div>
            <Button onClick={() => {
              this.calendar.today()
              this.handleRangeChange()
            }}><FormattedMessage id="client.scheduler.today"/></Button>

            <Button onClick={() => {
              this.calendar.prev()
              this.handleRangeChange()
            }} icon="fa-chevron-left" title={this.msg('client.scheduler.previous')}/>
            <Button onClick={() => {
              this.calendar.next()
              this.handleRangeChange()
            }} icon="fa-chevron-right" title={this.msg('client.scheduler.next')}/>
            {title}
            <Button icon={`fa-refresh ${this.props.isLoading ? 'fa-spin' : ''}`}
              title={this.msg('client.scheduler.reload')}
              onClick={() => { if (!this.props.isLoading) { this.props.onRefresh() } }}/>
          </div>
          <div>
            <Button {...(this.getButtonLookProps('timelineMonth'))}
              onClick={() => this.changeView('timelineMonth')}><FormattedMessage
                id="client.scheduler.month"/></Button>
            <Button {...(this.getButtonLookProps('timelineWeek'))}
              onClick={() => this.changeView('timelineWeek')}><FormattedMessage
                id="client.scheduler.week"/></Button>
            <Button {...(this.getButtonLookProps('timelineDay'))}
              onClick={() => this.changeView('timelineDay')}><FormattedMessage
                id="client.scheduler.day"/></Button>
          </div>
        </div>
        <div ref={ref => { this.calendarElementRef = ref }}></div>
      </div>
    )
  }
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
