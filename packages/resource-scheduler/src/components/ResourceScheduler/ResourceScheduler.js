import React from 'react'
import SplitPane from 'react-split-pane'
import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerAppContainer from '../../containers/SchedulerAppContainer'
import PropTypes from 'prop-types'

class ResourceScheduler extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  paneWidth = 400

  render() {
    const props = this.props
    return (
      <SplitPane split="vertical" minSize={300} defaultSize={this.paneWidth}>
        <div className="spit-panel-wrapper">
          <SearchPanel
            calendarTypes={props.calendarTypes}
            updateRequestedCalendars={props.updateRequestedCalendars}
            requestedCalendars={this.props.requestedCalendars}
          />
        </div>
        <div className="spit-panel-wrapper">
          <SchedulerAppContainer/>
        </div>
      </SplitPane>
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
          start: PropTypes.string,
          end: PropTypes.string,
          allDay: PropTypes.bool
        }
        )
      ),
      id: PropTypes.string.isRequred,
      label: PropTypes.string.isRequred,
      model: PropTypes.string.isRequred
    })),
  calendarTypes: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      formBase: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      targetEntity: PropTypes.string.isRequired
    }
    )),
  requestedCalendars: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
}

export default ResourceScheduler
