import React from 'react'
import PropTypes from 'prop-types'

import dashboard from './dashboard.png'

const EntityDashboard = ({match}) => {
  const entityName = match.params.entity
  return (
    <div>
      <h1>{entityName} Dashboard</h1>
      <img src={dashboard}/>
    </div>
  )
}

EntityDashboard.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityDashboard
