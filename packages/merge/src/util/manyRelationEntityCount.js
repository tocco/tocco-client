import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'

const maxCountLink = 100

export const ManyRelationEntityCount = ({model, keys, totalKeys, navigationStrategy}) => {
  if (totalKeys === 0) {
    return <Typography.Span>{totalKeys}</Typography.Span>
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
  navigationStrategy: navigationStrategy.propTypes
}
