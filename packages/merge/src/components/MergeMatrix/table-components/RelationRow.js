import PropTypes from 'prop-types'
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
          const cls = isTargetEntity(entity.pk) ? 'merge-matrix-selected-col' : ''
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
  relation: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  selectSourceRelation: PropTypes.func.isRequired,
  targetEntity: PropTypes.object.isRequired,
  selections: PropTypes.object.isRequired
}

export default RelationRow
