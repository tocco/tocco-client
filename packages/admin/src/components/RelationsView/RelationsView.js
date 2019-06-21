import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const RelationsView = ({match}) => {
  return (
    <div>
      <h1>Relations View</h1>
      <ul>
        <li>
          <Link to={match.url.replace(/relations$/, 'relAddress_c')}>Address</Link>
        </li>
        <li>
          <Link to={match.url.replace(/relations$/, 'relDonation')}>Donation</Link>
        </li>
      </ul>
    </div>
  )
}

RelationsView.propTypes = {
  match: PropTypes.object.isRequired
}

export default RelationsView
