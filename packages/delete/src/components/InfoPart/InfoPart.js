import React from 'react'
import {Typography, RouterLink} from 'tocco-ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LinkPopOver from './LinkPopOver'
import {relatedPropType} from '../../utils/deleteRequestParser'

const NonBreakingText = styled.span`
  white-space: nowrap;
`

const InfoPart = ({entityName, entityLabel, keys, relatedEntities, maxCountLink}) => {
  const primaryTql = 'KEYS(' + keys.join(',') + ')'
  return <Typography.Span>
    <Typography.B>
      {entityLabel} ({
        keys.length > 0
          ? <RouterLink to={`/e/${entityName}/list?tql=${primaryTql}`} target="_blank">{keys.length}</RouterLink>
          : <Typography.Span>{keys.length}</Typography.Span>
      })
    </Typography.B>
    {
      Object.keys(relatedEntities).length > 0
      && <>
        <span> / </span>
        {Object.keys(relatedEntities).map(entityName => {
          const relatedEntity = relatedEntities[entityName]
          const tql = 'KEYS(' + relatedEntity.keys.slice(0, maxCountLink).join(',') + ')'
          const linkText = [...relatedEntity.keys, ...relatedEntity.keysOtherBu].length

          const Count = relatedEntity.keys.length > 0
            ? <RouterLink to={`/e/${entityName}/list?tql=${tql}`} target="_blank">
              {linkText}
            </RouterLink>
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
  maxCountLink: PropTypes.number
}

export default InfoPart
