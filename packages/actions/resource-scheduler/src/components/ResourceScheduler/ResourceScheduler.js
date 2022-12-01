import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'
import {notification, errorLogging} from 'tocco-app-extensions'
import {LoadMask, SidepanelMainContent, Sidepanel, SidepanelHeader, SidepanelContainer} from 'tocco-ui'

import SchedulerAppContainer from '../../containers/SchedulerAppContainer'
import SearchPanel from '../SearchPanel/SearchPanel'
import {StyledSearchPanelWrapper, StyledSchedulerAppContainerWrapper} from './StyledComponents'

const ResourceScheduler = ({
  initialize,
  locale,
  calendarTypes,
  updateRequestedCalendars,
  requestedCalendars,
  handleNotifications,
  emitAction,
  initialCalendarType
}) => {
  useEffect(() => {
    initialize()
  }, [initialize])

  const [isCollapsed, setIsCollapsed] = useState(false)
  const schedulerRef = useRef(null)

  useEffect(() => {
    if (schedulerRef.current) {
      schedulerRef.current.updateSize()
    }
  }, [isCollapsed])

  return (
    <SidepanelContainer
      sidepanelPosition={'left'}
      sidepanelCollapsed={isCollapsed}
      setSidepanelCollapsed={setIsCollapsed}
    >
      {handleNotifications && <notification.Notifications />}
      <Sidepanel>
        <errorLogging.ErrorBoundary>
          <LoadMask required={[calendarTypes]}>
            <SidepanelHeader />
            <StyledSearchPanelWrapper>
              <SearchPanel
                locale={locale}
                calendarTypes={calendarTypes}
                updateRequestedCalendars={updateRequestedCalendars}
                requestedCalendars={requestedCalendars}
                emitAction={emitAction}
                initialCalendarType={initialCalendarType}
              />
            </StyledSearchPanelWrapper>
          </LoadMask>
        </errorLogging.ErrorBoundary>
      </Sidepanel>

      <SidepanelMainContent>
        <errorLogging.ErrorBoundary>
          <StyledSchedulerAppContainerWrapper>
            <SchedulerAppContainer schedulerRef={schedulerRef} />
          </StyledSchedulerAppContainerWrapper>
        </errorLogging.ErrorBoundary>
      </SidepanelMainContent>
    </SidepanelContainer>
  )
}

ResourceScheduler.propTypes = {
  initialize: PropTypes.func.isRequired,
  handleNotifications: PropTypes.bool.isRequired,
  updateRequestedCalendars: PropTypes.func.isRequired,
  removeRequestedCalendar: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired,
  calendars: PropTypes.arrayOf(
    PropTypes.shape({
      calendarType: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          start: PropTypes.number,
          end: PropTypes.number,
          allDay: PropTypes.bool
        })
      ),
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired
    })
  ),
  calendarTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      formBase: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      targetEntity: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ),
  requestedCalendars: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired,
  initialCalendarType: PropTypes.string
}

export default ResourceScheduler
