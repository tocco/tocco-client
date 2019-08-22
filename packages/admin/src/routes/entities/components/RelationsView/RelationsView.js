import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Button} from 'tocco-ui'

import {StyledLink} from '../../../../components/StyledLink'

const RelationsView = ({match, currentViewInfo, relations, relationsCount}) => {
  if (!relations || !currentViewInfo) {
    return null
  }

  const count = relationName => relationsCount[relationName] ? <span>({relationsCount[relationName]})</span> : null
  return (
    <div>
      <Typography.H4>Relations</Typography.H4>
      {relations.map((relation, idx) => (
        <span key={idx} style={{padding: '3px'}}>
          <Button look="raised">
            <StyledLink to={match.url.replace(/(relations|detail)$/, relation.relationName)}>
              {relation.relationDisplay.label} {count(relation.relationName)}
            </StyledLink>
          </Button>
        </span>
      ))}
    </div>
  )
}

RelationsView.propTypes = {
  match: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object,
  relations: PropTypes.array,
  relationsCount: PropTypes.object
}

export default RelationsView
