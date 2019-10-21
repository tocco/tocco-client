import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'
import ReactFullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import moment from 'moment'
import 'twix'
import '!style-loader!css-loader!@fullcalendar/core/main.css'
import '!style-loader!css-loader!@fullcalendar/timeline/main.css'
import '!style-loader!css-loader!@fullcalendar/resource-timeline/main.css'
import {FormattedValue} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'
import Tooltip from 'tooltip.js'
import {injectIntl, intlShape} from 'react-intl'

import NavigationFullCalendar from '../NavigationFullCalendar'
import StyledFullCalendar from './StyledFullCalendar'
import Conflict from '../Conflict'

const getLicense = () => {
  const licence = process.env.FULL_CALENDAR_LICENCE
  if (licence) return licence
  consoleLogger.logWarning('This Version runs with the NonCommercial FullCalendar license.')
  return 'CC-Attribution-NonCommercial-NoDerivatives' // noncommercial license
}

const FullCalendar = ({
  resources,
  events,
  onDateRangeChange,
  isLoading,
  onRefresh,
  onCalendarRemove,
  onCalendarRemoveAll,
  locale,
  intl
}) => {
  const calendarEl = useRef(null)
  const wrapperEl = useRef(null)

  useEffect(() => {
    moment.locale(locale)
    changeRange()
  }, [])

  useEffect(() => {
    addDeselectAllButton()
  })

  const addDeselectAllButton = () => {
    const firstHeaderNode = document.querySelectorAll('.fc-widget-header')[0]
    if (firstHeaderNode) {
      const checkbox = document.createElement('INPUT')
      checkbox.type = 'checkbox'
      if (resources.length > 0) {
        checkbox.checked = 'checked'
      }
      checkbox.className = 'remove-all-checkbox'
      checkbox.onclick = onCalendarRemoveAll

      firstHeaderNode.innerHTML = ''
      firstHeaderNode.appendChild(checkbox)
    }
  }

  const changeRange = () => {
    const view = calendarEl.current.calendar.view
    if (onDateRangeChange) {
      onDateRangeChange({startDate: view.activeStart, endDate: view.activeEnd})
    }
  }

  const changeView = (view = 'timelineDay') => {
    calendarEl.current.calendar.changeView(view)
    changeRange()
  }

  const resourceRender = renderInfo => {
    const element = renderInfo.el.getElementsByClassName('fc-cell-content')[0]
    const checkbox = document.createElement('INPUT')
    checkbox.type = 'checkbox'
    checkbox.checked = 'checked'
    checkbox.onclick = () =>
      onCalendarRemove(renderInfo.resource.extendedProps.entityKey, renderInfo.resource.extendedProps.calendarType)
    element.prepend(checkbox)
  }

  const eventRender = ({event, el}) => {
    const time = moment(event.start).twix(moment(event.end)).format({monthFormat: 'MMMM', dayFormat: 'Do'})
    const tooltipDescriptionContent = <div>
      <FormattedValue type="html" value={event.extendedProps.description}/>
      <p>{time}</p>
      <p><Conflict conflictStatus={event.extendedProps.conflict} intl={intl}/></p>
    </div>

    const content = ReactDOMServer.renderToString(tooltipDescriptionContent)

    // eslint-disable-next-line no-new
    new Tooltip(el, {
      title: content,
      placement: 'top',
      trigger: 'hover',
      container: wrapperEl.current,
      html: true
    })
  }

  return <StyledFullCalendar>
    <div ref={wrapperEl}>
      {calendarEl.current && <NavigationFullCalendar
        changeRange={changeRange}
        changeView={changeView}
        chooseNext={() => calendarEl.current.calendar.next()}
        choosePrev={() => calendarEl.current.calendar.prev()}
        chooseToday={() => calendarEl.current.calendar.today()}

        goToDate={date => calendarEl.current.calendar.gotoDate(date)}

        date={calendarEl.current.calendar.getDate()}
        isLoading={isLoading}
        refresh={onRefresh}
        title={calendarEl.current.calendar.view.title}
        type={calendarEl.current.calendar.view.type}
      />}
      <ReactFullCalendar
        locale={locale}
        plugins={[resourceTimelinePlugin]}
        ref={calendarEl}
        schedulerLicenseKey={getLicense()}
        defaultView={'resourceTimelineDay'}
        header={false}
        height="auto"
        resourceAreaWidth="15%"
        events={events}
        resources={resources}
        resourceColumns={[{labelText: ''}]}
        resourceRender={resourceRender}
        eventRender={eventRender}
      />
    </div>
  </StyledFullCalendar>
}

FullCalendar.defaultProps = {
  locale: 'en'
}

FullCalendar.propTypes = {
  intl: intlShape.isRequired,
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func,
  onCalendarRemoveAll: PropTypes.func,
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
