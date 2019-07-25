import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

const Dashboard = props => {
  return (
    <div>
      <Typography.H1>Home / Dashboard</Typography.H1>
      <Typography.Span>{JSON.stringify(props.match)}</Typography.Span>
    </div>
  )
}

Dashboard.propTypes = {
  match: PropTypes.object
}

export default Dashboard
