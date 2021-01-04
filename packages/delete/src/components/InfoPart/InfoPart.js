import React from 'react'
import {Typography} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LinkPopOver from './LinkPopOver'
import {relatedPropType} from '../../utils/deleteRequestParser'

const NonBreakingText = styled.span`
  white-space: nowrap;
`

const InfoPart = ({entityName, entityLabel, keys, relatedEntities, maxCountLink, navigationStrategy}) => {
  return <Typography.Span>
    <Typography.B>
      {entityLabel} ({
        keys.length > 0 && navigationStrategy.ListLink
          ? <navigationStrategy.ListLink
            entityName={entityName}
            entityKeys={keys}
          >
            {keys.length}
          </navigationStrategy.ListLink>
          : <Typography.Span>{keys.length}</Typography.Span>
      })
    </Typography.B>
    {
      Object.keys(relatedEntities).length > 0
      && <>
        <span> / </span>
        {Object.keys(relatedEntities).map(entityName => {
          const relatedEntity = relatedEntities[entityName]
          const linkText = [...relatedEntity.keys, ...relatedEntity.keysOtherBu].length

          const Count = relatedEntity.keys.length > 0 && navigationStrategy.ListLink
            ? <navigationStrategy.ListLink
              entityName={entityName}
              keys={relatedEntity.keys.slice(0, maxCountLink)}
            >
              {linkText}
            </navigationStrategy.ListLink>
            : <Typography.Span>{linkText}</Typography.Span>

          const Content = <LinkPopOver relatedEntity={relatedEntity} maxCountLink={maxCountLink}>{Count}</LinkPopOver>

          return <React.Fragment
            key={'entity-info-' + entityName}>
            <NonBreakingText>{relatedEntity.entityLabel} ({Content})</NonBreakingText>
          </React.Fragment>
        }).reduce((prev, curr) => [prev, ', ', curr])}
      </>
    }

  </Typography.Span>
}

InfoPart.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityLabel: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string),
  relatedEntities: PropTypes.objectOf(relatedPropType).isRequired,
  maxCountLink: PropTypes.number,
  navigationStrategy: navigationStrategy.propTypes
}

export default InfoPart
