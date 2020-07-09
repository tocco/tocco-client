import React from 'react'
import {Typography, Link} from 'tocco-ui'
import PropTypes from 'prop-types'

import LinkPopOver from './LinkPopOver'
import {relatedPropType} from '../../utils/deleteRequestParser'

const InfoPart = ({entityName, entityLabel, keys, relatedEntities, maxCountLink}) => {
  const primaryTql = 'IN(pk,' + keys.join(',') + ')'
  return <Typography.Span>
    <Typography.B>
      {entityLabel} (<Link href={`/e/${entityName}/list?tql=${primaryTql}`} rel="noopener noreferrer" target="_blank">
        {keys.length}
      </Link>)
    </Typography.B>
    {
      Object.keys(relatedEntities).length > 0
      && <>
        <span> / </span>
        {Object.keys(relatedEntities).map(entityName => {
          const relatedEntity = relatedEntities[entityName]
          const tql = 'IN(pk,' + relatedEntity.keys.slice(0, maxCountLink).join(',') + ')'
          const linkText = [...relatedEntity.keys, ...relatedEntity.keysOtherBu].length

          const Count = relatedEntity.keys.length > 0
            ? <Link href={`/e/${entityName}/list?tql=${tql}`} rel="noopener noreferrer" target="_blank">
              {linkText}
            </Link>
            : <Typography.Span>{linkText}</Typography.Span>

          const Content = <LinkPopOver relatedEntity={relatedEntity} maxCountLink={maxCountLink}>{Count}</LinkPopOver>

          return <React.Fragment
            key={'entity-info-' + entityName}>
            {relatedEntity.entityLabel} ({Content})
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
