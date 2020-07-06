import React from 'react'
import {Typography, Link} from 'tocco-ui'
import PropTypes from 'prop-types'

import LinkPopOver from './LinkPopOver'
import {relatedPropTypes} from '../../utils/deleteRequestParser'

const InfoPart = ({entityName, entityModel, primaryPks, relatedEntities, maxCountLink}) => {
  const primaryTql = 'IN(pk,' + primaryPks.join(',') + ')'
  return <Typography.Span>
    <Typography.B>
      {entityName} (<Link href={`/e/${entityModel}/list?tql=${primaryTql}`} rel="noopener noreferrer" target="_blank">
        {primaryPks.length}
      </Link>)
    </Typography.B>
    {
      Object.keys(relatedEntities).length > 0
      && <>
        <span> / </span>
        {Object.keys(relatedEntities).map(entityModel => {
          const relatedEntity = relatedEntities[entityModel]
          const tql = 'IN(pk,' + relatedEntity.pks.slice(0, maxCountLink).join(',') + ')'
          const linkText = [...relatedEntity.pks, ...relatedEntity.pksOtherBu].length

          const Count = relatedEntity.pks.length > 0
            ? <Link href={`/e/${entityModel}/list?tql=${tql}`} rel="noopener noreferrer" target="_blank">
              {linkText}
            </Link>
            : <Typography.Span>{linkText}</Typography.Span>

          const Content = <LinkPopOver relatedEntity={relatedEntity} maxCountLink={maxCountLink}>{Count}</LinkPopOver>

          return <React.Fragment
            key={'entity-info-' + entityModel}>
            {relatedEntity.entityName} ({Content})
          </React.Fragment>
        }).reduce((prev, curr) => [prev, ', ', curr])}
      </>
    }

  </Typography.Span>
}

InfoPart.propTypes = {
  entityName: PropTypes.string,
  entityModel: PropTypes.string,
  primaryPks: PropTypes.arrayOf(PropTypes.string),
  relatedEntities: PropTypes.objectOf(relatedPropTypes).isRequired,
  maxCountLink: PropTypes.number
}

export default InfoPart
