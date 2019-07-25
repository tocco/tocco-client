import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'

import {StyledLink} from '../../../../components/StyledLink'

const RelationsView = ({match, currentViewInfo, relations}) => {
  if (!relations || !currentViewInfo) {
    return null
  }

  return (
    <div>
      <Typography.H2>Relations {currentViewInfo.model.name}</Typography.H2>
      <ul>
        {relations.map((relation, idx) => (
          <li key={idx}>
            <StyledLink to={match.url.replace(/relations$/, relation.relationName)}>
              {relation.relationName} ({relation.targetEntity})
            </StyledLink>
            <StyledLink to={match.url.replace(/relations$/, relation.relationName) + '/create'}>
              <Icon icon="plus"/>
            </StyledLink>
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
