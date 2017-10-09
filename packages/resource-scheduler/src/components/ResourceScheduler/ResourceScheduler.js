import React from 'react'
import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerApp from 'tocco-scheduler/src/main'
import PropTypes from 'prop-types'

class ResourceScheduler extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  render() {
    const props = this.props
    return (
      <div>
        <SearchPanel calendarTypes={props.calendarTypes}/>
        <SchedulerApp id="scheduler"/>
      </div>
    )
  }
}

ResourceScheduler.propTypes = {
  initialize: PropTypes.func.isRequired,
  calendarTypes: PropTypes.object
}

export default ResourceScheduler
