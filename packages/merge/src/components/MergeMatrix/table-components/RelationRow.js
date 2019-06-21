import PropTypes from 'prop-types'
import React from 'react'
import {Typography} from 'tocco-ui'

import SingleSelection from './SingleSelection'
import {StyledMergeMatrixTd} from '../StyledMergeMatrix'

const RelationRow = props => {
  const isTargetEntity = pk => pk === props.targetEntity.pk

  const isWritableRow = !props.targetEntity.relations[props.relation.name].writable

  return (
    <tr>
      <StyledMergeMatrixTd bold>{props.relation.label}</StyledMergeMatrixTd>
      {
        props.entities.map((entity, idx) => {
          const entityRelationValue = entity.relations[props.relation.name].values[0]
          return (
            <StyledMergeMatrixTd
              disabled={isWritableRow}
              selected={isTargetEntity(entity.pk)}
              key={'td' + idx}>
              <SingleSelection
                identifier={props.relation.name}
                pk={entity.pk}
                onChange={props.selectSourceRelation}
                checked={props.selections.relations[props.relation.name] === entity.pk}
                disabled={isWritableRow}>
                <Typography.Span>{entityRelationValue && entityRelationValue.label}</Typography.Span>
              </SingleSelection>
            </StyledMergeMatrixTd>
          )
        })
      }
    </tr>
  )
}

RelationRow.propTypes = {
  relation: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  selectSourceRelation: PropTypes.func.isRequired,
  targetEntity: PropTypes.object.isRequired,
  selections: PropTypes.object.isRequired
}

export default RelationRow
