import React from 'react'
import MultiSelection from './MultiSelection'

const ToManyRelationRow = props => {
  var isTargetEntity = pk => pk === props.targetEntity.pk

  var isWritableRow = props.targetEntity.relations[props.relation.name].writable

  return (
    <tr>
      <td className="bold">{props.relation.label}</td>
      {
        props.entities.map((entity, idx) => {
          var cls = isTargetEntity(entity.pk) ? 'merger-matrix-selected-col' : ''
          var disabled = !(props.targetEntity.pk === entity.pk)
          var values = entity.relations[props.relation.name].values

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
  relation: React.PropTypes.object.isRequired,
  entities: React.PropTypes.array.isRequired,
  toggleRelationMany: React.PropTypes.func.isRequired,
  targetEntity: React.PropTypes.object.isRequired,
  selections: React.PropTypes.object.isRequired
}

export default ToManyRelationRow
