import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

const EntityDashboard = ({match}) => {
  const entityName = match.params.entity
  return (
    <div>
      <Typography.H1>{entityName}  Dashboard</Typography.H1>
      <Typography.Span>{JSON.stringify(match)}</Typography.Span>
    </div>
  )
}

EntityDashboard.propTypes = {
  match: PropTypes.object.isRequired
}

export default EntityDashboard
