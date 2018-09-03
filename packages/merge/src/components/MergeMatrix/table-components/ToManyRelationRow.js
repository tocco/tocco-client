import PropTypes from 'prop-types'
import React from 'react'

import MultiSelection from './MultiSelection'

const ToManyRelationRow = props => {
  const isTargetEntity = pk => pk === props.targetEntity.pk

  const isWritableRow = props.targetEntity.relations[props.relation.name].writable

  return (
    <tr>
      <td className="bold">{props.relation.label}</td>
      {
        props.entities.map((entity, idx) => {
          const cls = isTargetEntity(entity.pk) ? 'merge-matrix-selected-col' : ''
          const disabled = !(props.targetEntity.pk === entity.pk)
          const values = entity.relations[props.relation.name].values

          return (
            <td className={cls} key={'td' + idx}>
              <MultiSelection
                relationName={props.relation.name}
                values={values}
                entity={entity}
                onChange={props.toggleRelationMany}
                selections={props.selections}
                disabled={disabled || !isWritableRow}
              />
            </td>
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
