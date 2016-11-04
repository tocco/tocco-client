import React from 'react'
import SingleSelection from './SingleSelection'

const RelationRow = props => {
  const isTargetEntity = pk => pk === props.targetEntity.pk

  const isWritableRow = !props.targetEntity.relations[props.relation.name].writable

  return (
    <tr>
      <td className="bold">{props.relation.label}</td>
      {
        props.entities.map((entity, idx) => {
          const cls = isTargetEntity(entity.pk) ? 'merger-matrix-selected-col' : ''
          const entityRelationValue = entity.relations[props.relation.name].values[0]
          return (
            <td className={cls} key={'td' + idx}>
              <SingleSelection
                identifier={props.relation.name}
                pk={entity.pk}
                onChange={props.selectSourceRelation}
                checked={props.selections.relations[props.relation.name] === entity.pk}
                disabled={isWritableRow}
              >
                <div>{entityRelationValue && entityRelationValue.label}</div>
              </SingleSelection>
            </td>
          )
        })
      }
    </tr>
  )
}

RelationRow.propTypes = {
  relation: React.PropTypes.object.isRequired,
  entities: React.PropTypes.array.isRequired,
  selectSourceRelation: React.PropTypes.func.isRequired,
  targetEntity: React.PropTypes.object.isRequired,
  selections: React.PropTypes.object.isRequired
}

export default RelationRow
