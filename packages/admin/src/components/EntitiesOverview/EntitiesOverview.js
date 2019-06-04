import React from 'react'
import {Link} from 'react-router-dom'

const EntitiesOverview = props => {
  return (
    <div>
      <h1>Entities Overview</h1>
      <div>List of all available Entities</div>
      <ul>
        <li><Link to="/e/User/dashboard">User</Link></li>
        <li><Link to="/e/Address/dashboard">Address</Link></li>
      </ul>
    </div>
  )
}

EntitiesOverview.propTypes = {
}

export default EntitiesOverview
