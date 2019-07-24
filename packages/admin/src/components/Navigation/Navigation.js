import React from 'react'
import {Link} from 'react-router-dom'
import {Typography} from 'tocco-ui'

const Navigation = props => {
  return (
    <Typography.Span>
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
    </Typography.Span>
  )
}

Navigation.propTypes = {
}

export default Navigation
