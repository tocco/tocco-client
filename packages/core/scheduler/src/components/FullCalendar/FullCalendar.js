// eslint-disable-next-line import/order
import ReactFullCalendar from '@fullcalendar/react'
import adaptivePlugin from '@fullcalendar/adaptive'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import PropTypes from 'prop-types'
import {forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react'
import {FormattedValue, Popover} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import {getFormattedEventTime, getFormattedTime} from '../../utils/time'
import Conflict from '../Conflict'
import NavigationFullCalendar from '../NavigationFullCalendar'
import ResourceLabelContent from './ResourceLabelContent'
import {CalendarGlobalPrintStyle, StyledFullCalendarWrapper, StyledMemoizedFullCalender} from './StyledFullCalendar'

const getLicense = () => {
  const licence = process.env.FULL_CALENDAR_LICENCE
  if (licence) {
    return licence
  }
  consoleLogger.logWarning('This Version runs with the NonCommercial FullCalendar license.')
  return 'CC-Attribution-NonCommercial-NoDerivatives' // noncommercial license
}

const MONDAY = 1

const FullCalendar = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const calendarEl = useRef(null)
    const wrapperEl = useRef(null)

    const changeRange = useCallback(() => {
      const {view} = calendarEl.current.getApi()
      if (onDateRangeChange) {
        onDateRangeChange({startDate: view.activeStart, endDate: view.activeEnd})
      }
    }, [onDateRangeChange])

    const changeView = (view = 'timelineDay') => {
      calendarEl.current.getApi().changeView(view)
      changeRange()
    }

    useEffect(() => {
      changeRange()
    }, [changeRange, locale])

    // do not compare events as reference value
    useEffect(() => {
      const calendar = calendarEl.current.getApi()
      calendar.batchRendering(() => {
        const eventSources = calendar.getEventSources()
        eventSources.forEach(eS => eS.remove())
        calendar.addEventSource(events)
      })
    }, [JSON.stringify(events)]) // eslint-disable-line react-hooks/exhaustive-deps

    // do not compare resources as reference value
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
    }, [JSON.stringify(resources)]) // eslint-disable-line react-hooks/exhaustive-deps

    const headerContent = (
      <input
        type="checkbox"
        checked={true}
        onChange={() => onCalendarRemoveAll()}
        style={{visibility: resources.length > 0 ? 'visible' : 'hidden'}}
        className="remove-all-checkbox"
      />
    )

    const renderEventContent = eventInfo => {
      const time = getFormattedEventTime(locale, eventInfo.event.start, eventInfo.event.end || eventInfo.event.start)
      const tooltipDescriptionContent = (
        <div>
          <FormattedValue type="html" value={eventInfo.event.extendedProps.description} />
          <p>{time}</p>
          <p>
            <Conflict conflictStatus={eventInfo.event.extendedProps.conflict} intl={intl} />
          </p>
        </div>
      )
      const eventInfoStyleAttributes = eventInfo.event.extendedProps.styleAttr

      return (
        <Popover content={tooltipDescriptionContent} isPlainHtml placement="top">
          <div className={`fc-event-main-frame ${eventInfoStyleAttributes && eventInfoStyleAttributes.join(' ')}`}>
            {eventInfo.timeText && <div className="fc-event-time">{eventInfo.timeText}</div>}
            <div className="fc-event-title-container">
              <div className="fc-event-title fc-sticky">{eventInfo.event.title || <>&nbsp;</>}</div>
            </div>
          </div>
        </Popover>
      )
    }

    // does not respond to outer prop changes
    const memoizedFullCalendar = useMemo(
      () => (
        <ReactFullCalendar
          resourceOrder="calendarType,title"
          schedulerLicenseKey={getLicense()}
          locale={locale}
          plugins={[adaptivePlugin, resourceTimelinePlugin, interactionPlugin]}
          ref={calendarEl}
          initialView={'dayView'}
          headerToolbar={false}
          height="100%"
          resourceAreaWidth="15%"
          resourceAreaColumns={[{labelText: '', headerContent}]}
          resourceLabelContent={props => <ResourceLabelContent {...props} onCalendarRemove={onCalendarRemove} />}
          eventClick={info => {
            onEventClick(info.event)
          }}
          eventContent={renderEventContent}
          firstDay={MONDAY}
          slotMinTime="06:00:00"
          slotMaxTime="23:00:00"
          views={{
            dayView: {
              type: 'resourceTimelineDay',
              slotLabelFormat: info => getFormattedTime(locale, new Date(...info.date.array))
            },
            weekView: {
              type: 'resourceTimelineWeek',
              slotLabelFormat: [
                {weekday: 'short', month: 'numeric', day: 'numeric'},
                info => getFormattedTime(locale, new Date(...info.date.array))
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
                day: 'numeric',
                omitCommas: true
              }
            }
          }}
        />
      ),
      [resources.length] // eslint-disable-line react-hooks/exhaustive-deps
    )

    useImperativeHandle(ref, () => ({
      updateSize() {
        setTimeout(() => {
          calendarEl.current.getApi().updateSize()
        }, 0)
      }
    }))

    return (
      <StyledFullCalendarWrapper ref={wrapperEl}>
        <CalendarGlobalPrintStyle />
        {calendarEl.current && (
          <NavigationFullCalendar
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
          />
        )}
        <StyledMemoizedFullCalender id="section-to-print">{memoizedFullCalendar}</StyledMemoizedFullCalender>
      </StyledFullCalendarWrapper>
    )
  }
)

FullCalendar.defaultProps = {
  locale: 'en'
}

FullCalendar.propTypes = {
  intl: PropTypes.object.isRequired,
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
    })
  ),
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      calendarType: PropTypes.string.isRequired,
      entityKey: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  locale: PropTypes.string,
  isLoading: PropTypes.bool
}
FullCalendar.displayName = 'FullCalendar'

export default FullCalendar
