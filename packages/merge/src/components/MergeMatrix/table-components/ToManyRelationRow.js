import PropTypes from 'prop-types'
import React from 'react'

import MultiSelection from './MultiSelection'
import {StyledMergeMatrixTd} from '../StyledMergeMatrix'

const ToManyRelationRow = props => {
  const isTargetEntity = pk => pk === props.targetEntity.pk
  const isWritableRow = props.targetEntity.relations[props.relation.name].writable

  return (
    <tr>
      <StyledMergeMatrixTd bold>{props.relation.label}</StyledMergeMatrixTd>
      {
        props.entities.map((entity, idx) => {
          const disabled = !(props.targetEntity.pk === entity.pk)
          const values = entity.relations[props.relation.name].values

          return (
            <StyledMergeMatrixTd
              disabled={disabled || !isWritableRow}
              key={'td' + idx}
              selected={isTargetEntity(entity.pk)}>
              <MultiSelection
                relationName={props.relation.name}
                values={values}
                entity={entity}
                onChange={props.toggleRelationMany}
                selections={props.selections}
                disabled={disabled || !isWritableRow}
              />
            </StyledMergeMatrixTd>
          )
        })
      }
    </tr>
  )
}

ToManyRelationRow.propTypes = {
  relation: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  toggleRelationMany: PropTypes.func.isRequired,
  targetEntity: PropTypes.object.isRequired,
  selections: PropTypes.object.isRequired
}

export default ToManyRelationRow
