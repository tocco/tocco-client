import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'

import {ManyRelationsStyledLink} from './StyledComponents'

const maxCountLink = 100

export const ManyRelationEntityCount = ({model, keys, totalKeys, openEntityList, navigationStrategy, isOldClient}) => {
  if (totalKeys === 0) {
    return <Typography.Span>{totalKeys}</Typography.Span>
  } else if (isOldClient) {
    const showEntities = e => {
      e.stopPropagation()
      e.preventDefault()
      openEntityList(model, keys)
    }

    return <ManyRelationsStyledLink onClick={showEntities}>({totalKeys})</ManyRelationsStyledLink>
  } else {
    return <navigationStrategy.ListLink entityName={model} entityKeys={keys.slice(0, maxCountLink)}>
      ({totalKeys})
    </navigationStrategy.ListLink>
  }
}

ManyRelationEntityCount.propTypes = {
  model: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string),
  totalKeys: PropTypes.number.isRequired,
  openEntityList: PropTypes.func.isRequired,
  navigationStrategy: navigationStrategy.propTypes,
  isOldClient: PropTypes.bool.isRequired
}
