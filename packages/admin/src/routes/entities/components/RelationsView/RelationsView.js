import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const RelationsView = ({match, currentViewInfo}) => {
  if (!currentViewInfo) {
    return null
  }

  return (
    <div>
      <h1>Relations {currentViewInfo.model.name}</h1>

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
  match: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object
}

export default RelationsView
