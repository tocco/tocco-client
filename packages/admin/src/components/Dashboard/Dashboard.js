import React from 'react'

import image from './dashboard.png'

const Dashboard = props => {
  return (
    <div>
      <h1>Dashboard</h1>
      <img src={image}/>
    </div>
  )
}

Dashboard.propTypes = {
}

export default Dashboard
