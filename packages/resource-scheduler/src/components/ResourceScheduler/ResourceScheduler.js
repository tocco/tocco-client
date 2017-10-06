import React from 'react'
import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerApp from 'tocco-scheduler/src/main'

class ResourceScheduler extends React.Component {
  render() {
    return (
      <div>
        <SearchPanel/>
        <SchedulerApp id="scheduler"/>
      </div>
    )
  }
}

export default ResourceScheduler
