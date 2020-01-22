import React from 'react'
import SplitPane from 'react-split-pane'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {scale} from 'tocco-ui'

import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerAppContainer from '../../containers/SchedulerAppContainer'
import {
  resizerStyle,
  StyledSplitPanelWrapperLeft,
  StyledSplitPanelWrapperRight
} from './StyledResourceScheduler'

const StyledSplitPane = styled(SplitPane)`
  position: static !important;
  height: calc(100vh - 50px) !important;
  
  .react-bs-container-body {
    height: auto !important;
    margin-bottom: ${scale.space(0)};
  }
`

class ResourceScheduler extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize()
  }

  paneWidth = 325

  render() {
    const props = this.props
    return (
      <StyledSplitPane
        defaultSize={this.paneWidth}
        minSize={325}
        resizerStyle={resizerStyle}
        split="vertical"
      >
        <StyledSplitPanelWrapperLeft>
          <SearchPanel
            locale={props.locale}
            calendarTypes={props.calendarTypes}
            updateRequestedCalendars={props.updateRequestedCalendars}
            requestedCalendars={this.props.requestedCalendars}
          />
        </StyledSplitPanelWrapperLeft>
        <StyledSplitPanelWrapperRight>
          <SchedulerAppContainer/>
        </StyledSplitPanelWrapperRight>
      </StyledSplitPane>
    )
  }
}

ResourceScheduler.propTypes = {
  initialize: PropTypes.func.isRequired,
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
        }
        )
      ),
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired
    })),
  calendarTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      formBase: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      targetEntity: PropTypes.string.isRequired,
      color: PropTypes.string
    }
    )),
  requestedCalendars: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  locale: PropTypes.string
}

export default ResourceScheduler
