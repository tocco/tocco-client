import PropTypes from 'prop-types'
import React, {useEffect, useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import {notification} from 'tocco-app-extensions'
import {Icon} from 'tocco-ui'

import SchedulerAppContainer from '../../containers/SchedulerAppContainer'
import SearchPanel from '../SearchPanel/SearchPanel'
import {
  StyledResourceSchedulerWrapper,
  StyledSplitPanelWrapperLeft,
  StyledSplitPanelWrapperRight,
  StyledSplitPane,
  StyledGutter,
  StyledPlaceHolder,
  StyledToggleCollapse,
  StyledToggleCollapseButton
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

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [percentageSizes, setPercentageSizes] = useState([20, 80])
  const [minPxSizes, setMinPxSizes] = useState([325, 650])

  const toggleSizes = () => {
    if (!isCollapsed) {
      setPercentageSizes([0, 99])
      setMinPxSizes([0, 975])
    } else {
      setPercentageSizes([20, 80])
      setMinPxSizes([325, 650])
    }
  }

  const schedulerRef = useRef(null)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    toggleSizes()
    if (schedulerRef.current) {
      schedulerRef.current.updateSize()
    }
  }

  return (
    <StyledResourceSchedulerWrapper>
      <StyledPlaceHolder onClick={toggleCollapse} isCollapsed={isCollapsed}>
        <StyledToggleCollapse isCollapsed={isCollapsed}>
          <StyledToggleCollapseButton icon="chevron-right" isCollapsed={isCollapsed} />
        </StyledToggleCollapse>
      </StyledPlaceHolder>
      {handleNotifications && <notification.Notifications />}
      <StyledSplitPane
        sizes={percentageSizes}
        minSize={minPxSizes}
        direction="horizontal"
        cursor="col-resize"
        gutter={getGutter()}
        isCollapsed={isCollapsed}
      >
        <StyledSplitPanelWrapperLeft isCollapsed={isCollapsed}>
          <StyledToggleCollapse>
            <StyledToggleCollapseButton icon="chevron-left" onClick={toggleCollapse} />
          </StyledToggleCollapse>
          <SearchPanel
            locale={locale}
            calendarTypes={calendarTypes}
            updateRequestedCalendars={updateRequestedCalendars}
            requestedCalendars={requestedCalendars}
            emitAction={emitAction}
          />
        </StyledSplitPanelWrapperLeft>
        <StyledSplitPanelWrapperRight>
          <SchedulerAppContainer schedulerRef={schedulerRef} />
        </StyledSplitPanelWrapperRight>
      </StyledSplitPane>
    </StyledResourceSchedulerWrapper>
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
