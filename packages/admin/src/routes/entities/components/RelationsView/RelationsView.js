import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

const RelationsView = ({match, currentViewInfo, relations}) => {
  if (!relations || !currentViewInfo) {
    return null
  }

  return (
    <div>
      <h1>Relations {currentViewInfo.model.name}</h1>
      <ul>
        {relations.map((relation, idx) => (
          <li key={idx}>
            <Link to={match.url.replace(/relations$/, relation.relationName)}>
              {relation.relationName} ({relation.targetEntity})
            </Link>
            <Link to={match.url.replace(/relations$/, relation.relationName) + '/create'}><Icon icon="plus"/></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

RelationsView.propTypes = {
  match: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object,
  relations: PropTypes.array
}

export default RelationsView
