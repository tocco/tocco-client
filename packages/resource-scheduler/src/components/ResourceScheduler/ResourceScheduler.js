import React from 'react'
import SplitPane from 'react-split-pane'
import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerApp from 'tocco-scheduler/src/main'
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
        <div className="search-panel-wrapper">
          <SearchPanel
            calendarTypes={props.calendarTypes}
            addCalendarsOfType={props.addCalendarsOfType}
          />
        </div>
        <SchedulerApp id="scheduler" calendar={props.calendars}/>
      </SplitPane>
    )
  }
}

ResourceScheduler.propTypes = {
  initialize: PropTypes.func.isRequired,
  addCalendarsOfType: PropTypes.func.isRequired,
  calendars: PropTypes.array,
  calendarTypes: PropTypes.array
}

export default ResourceScheduler
