import React, {useRef, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import ReactFullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import moment from 'moment'
import 'twix'
import {FormattedValue, Popover} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'
import {injectIntl, intlShape} from 'react-intl'
import interactionPlugin from '@fullcalendar/interaction'
import adaptivePlugin from '@fullcalendar/adaptive'

import NavigationFullCalendar from '../NavigationFullCalendar'
import {StyledFullCalendarWrapper, StyledMemoizedFullCalender} from './StyledFullCalendar'
import Conflict from '../Conflict'
import {getFormattedTime} from '../../utils/time'
import ResourceLabelContent from './ResourceLabelContent'

const getLicense = () => {
  const licence = process.env.FULL_CALENDAR_LICENCE
  if (licence) {
    return licence
  }
  consoleLogger.logWarning('This Version runs with the NonCommercial FullCalendar license.')
  return 'CC-Attribution-NonCommercial-NoDerivatives' // noncommercial license
}

const MONDAY = 1

const FullCalendar = ({
  resources,
  events,
  onDateRangeChange,
  isLoading,
  onRefresh,
  onCalendarRemove,
  onCalendarRemoveAll,
  locale,
  onEventClick,
  intl
}) => {
  const calendarEl = useRef(null)
  const wrapperEl = useRef(null)

  useEffect(() => {
    moment.locale(locale)
    changeRange()
  }, [])

  useEffect(() => {
    const calendar = calendarEl.current.getApi()
    calendar.batchRendering(() => {
      const eventSources = calendar.getEventSources()
      eventSources.forEach(eS => eS.remove())
      calendar.addEventSource(events)
    })
  }, [JSON.stringify(events)])

  useEffect(() => {
    const calendar = calendarEl.current.getApi()
    calendar.batchRendering(() => {
      const loadedResources = calendar.getResources()
      loadedResources.forEach(l => {
        const contains = resources.find(r => l.id === r.id)
        if (!contains) {
          l.remove()
        }
      })

      resources.forEach(r => {
        const contains = loadedResources.find(l => l.id === r.id)
        if (!contains) {
          calendar.addResource(r)
        }
      })
    })
  }, [JSON.stringify(resources)])

  const headerContent = <input
    type="checkbox"
    defaultChecked={true}
    style={{visibility: resources.length > 0 ? 'visible' : 'hidden'}}
    className="remove-all-checkbox"
    onClick={onCalendarRemoveAll}
  />

  const changeRange = () => {
    const {view} = calendarEl.current.getApi()
    if (onDateRangeChange) {
      onDateRangeChange({startDate: view.activeStart, endDate: view.activeEnd})
    }
  }

  const changeView = (view = 'timelineDay') => {
    calendarEl.current.getApi().changeView(view)
    changeRange()
  }

  function renderEventContent(eventInfo) {
    const time = moment(eventInfo.event.start)
      .twix(moment(eventInfo.event.end))
      .format({monthFormat: 'MMMM', dayFormat: 'Do'})
    const tooltipDescriptionContent = <div>
      <FormattedValue type="html" value={eventInfo.event.extendedProps.description}/>
      <p>{time}</p>
      <p><Conflict conflictStatus={eventInfo.event.extendedProps.conflict} intl={intl}/></p>
    </div>
    const eventInfoStyleAttributes = eventInfo.event.extendedProps.styleAttr

    return (
      <Popover
        content={tooltipDescriptionContent}
        isPlainHtml
        placement="top"
        spacer={10}
      >
        <div className={`fc-event-main-frame ${eventInfoStyleAttributes && eventInfoStyleAttributes.join(' ')}`}>
          {eventInfo.timeText && <div className="fc-event-time">{eventInfo.timeText}</div>}
          <div className="fc-event-title-container">
            <div className="fc-event-title fc-sticky">
              {eventInfo.event.title || <>&nbsp;</>}
            </div>
          </div>
        </div>
      </Popover>
    )
  }

  const memoizedFullCalendar = useMemo(() =>
    <ReactFullCalendar
      resourceOrder=""
      schedulerLicenseKey={getLicense()}
      locale={locale}
      plugins={[adaptivePlugin, resourceTimelinePlugin, interactionPlugin]}
      ref={calendarEl}
      initialView={'dayView'}
      headerToolbar={false}
      height="auto"
      resourceAreaWidth="15%"
      resourceAreaColumns={[{labelText: '', headerContent}]}
      resourceLabelContent={props => <ResourceLabelContent {...props} onCalendarRemove={onCalendarRemove}/>}
      eventClick={info => {
        onEventClick(info.event)
      }}
      eventContent={renderEventContent}
      firstDay={MONDAY}
      slotMinTime ="06:00:00"
      slotMaxTime ="23:00:00"
      views={{
        dayView: {
          type: 'resourceTimelineDay',
          slotLabelFormat: info => getFormattedTime(moment(info.date).locale(locale))
        },
        weekView: {
          type: 'resourceTimelineWeek',
          slotLabelFormat: [
            {weekday: 'short', month: 'numeric', day: 'numeric'},
            info => getFormattedTime(moment(info.date).locale(locale))
          ]
        },
        weekViewSimple: {
          type: 'resourceTimelineWeek',
          slotDuration: {day: 1},
          slotLabelFormat: [
            {
              weekday: 'short',
              month: 'numeric',
              day: 'numeric'
            }
          ]
        },
        monthView: {
          type: 'resourceTimelineMonth',
          slotLabelFormat: {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric',
            omitCommas: true
          }
        }
      }}
    />, [])

  return <StyledFullCalendarWrapper ref={wrapperEl}>
    {calendarEl.current && <NavigationFullCalendar
      changeRange={changeRange}
      changeView={changeView}
      chooseNext={() => calendarEl.current.getApi().next()}
      choosePrev={() => calendarEl.current.getApi().prev()}
      chooseToday={() => calendarEl.current.getApi().today()}
      goToDate={date => calendarEl.current.getApi().gotoDate(date)}
      date={calendarEl.current.getApi().getDate()}
      isLoading={isLoading}
      refresh={onRefresh}
      title={calendarEl.current.getApi().view.title}
      type={calendarEl.current.getApi().view.type}
    />}
    <StyledMemoizedFullCalender>
      {memoizedFullCalendar}
    </StyledMemoizedFullCalender>
  </StyledFullCalendarWrapper>
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
  onEventClick: PropTypes.func.isRequired,
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
