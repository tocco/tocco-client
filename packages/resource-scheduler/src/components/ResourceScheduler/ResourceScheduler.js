import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {notification} from 'tocco-app-extensions'
import {Icon} from 'tocco-ui'

import SchedulerAppContainer from '../../containers/SchedulerAppContainer'
import SearchPanel from '../SearchPanel/SearchPanel'
import {
  StyledSplitPanelWrapperLeft,
  StyledSplitPanelWrapperRight,
  StyledSplitPane,
  StyledGutter
} from './StyledComponents'

const getGutter = () => () => {
  const gutterEl = document.createElement('div')
  ReactDOM.render(
    <StyledGutter tabIndex={0}>
      <Icon icon="vertical-rule" />
    </StyledGutter>,
    gutterEl
  )
  return gutterEl
}

const ResourceScheduler = ({
  initialize,
  locale,
  calendarTypes,
  updateRequestedCalendars,
  requestedCalendars,
  handleNotifications,
  emitAction
}) => {
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      {handleNotifications && <notification.Notifications />}
      <StyledSplitPane
        sizes={[20, 80]}
        minSize={[325, 650]}
        direction="horizontal"
        cursor="col-resize"
        gutter={getGutter()}
      >
        <StyledSplitPanelWrapperLeft>
          <SearchPanel
            locale={locale}
            calendarTypes={calendarTypes}
            updateRequestedCalendars={updateRequestedCalendars}
            requestedCalendars={requestedCalendars}
            emitAction={emitAction}
          />
        </StyledSplitPanelWrapperLeft>
        <StyledSplitPanelWrapperRight>
          <SchedulerAppContainer />
        </StyledSplitPanelWrapperRight>
      </StyledSplitPane>
    </>
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
  emitAction: PropTypes.func.isRequired
}

export default ResourceScheduler
