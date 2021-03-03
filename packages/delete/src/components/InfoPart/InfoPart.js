import React from 'react'
import {Typography} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LinkPopOver from './LinkPopOver'
import {deleteEntityPropType} from '../../utils/deleteRequestParser'

const NonBreakingText = styled.span`
  white-space: nowrap;
`

const InfoPart = ({rootEntities, relatedEntities, maxCountLink, navigationStrategy}) => (
  <Typography.Span>
    <Typography.B>
      {
        Object.entries(rootEntities).map(([rootEntityName, rootEntity]) => (
          <span key={`root-entity-${rootEntityName}`}>
             {rootEntity.entityLabel} ({rootEntity.keys.length > 0 && navigationStrategy.ListLink
               ? <navigationStrategy.ListLink
              entityName={rootEntityName}
              entityKeys={rootEntity.keys}
            >
              {rootEntity.keys.length}
                      </navigationStrategy.ListLink>
               : <Typography.Span>{rootEntity.keys.length}</Typography.Span>
             })</span>
        )).reduce((prev, curr) => [prev, ', ', curr])}
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
              entityKeys={relatedEntity.keys.slice(0, maxCountLink)}
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
)

InfoPart.propTypes = {
  rootEntities: PropTypes.objectOf(
    PropTypes.shape({
      entityLabel: PropTypes.string.isRequired,
      keys: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
  relatedEntities: PropTypes.objectOf(deleteEntityPropType).isRequired,
  maxCountLink: PropTypes.number,
  navigationStrategy: navigationStrategy.propTypes
}

export default InfoPart
