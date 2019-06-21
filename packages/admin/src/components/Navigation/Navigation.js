import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard / Home</Link>
        </li>
        <li>
          <Link to="/e">Entity Browser</Link>
          <ul>
            <li>  <Link to="/e/User">User</Link></li>
            <li>  <Link to="/e/Address">Address</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/s">Settings</Link>
        </li>
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
}

export default Navigation
