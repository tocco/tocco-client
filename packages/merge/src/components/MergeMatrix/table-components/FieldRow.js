import React from 'react'
import FieldLabel from '../../FieldLabel'
import SingleSelection from './SingleSelection'

const FieldRow = props => {
  var isTargetEntity = pk => pk === props.targetEntity.pk
  var isWritableRow = props.targetEntity.fields[props.field.name].writable

  return (
    <tr>
      <td className="bold">{props.field.label}</td>
      {
        props.entities.map((entity, idx) => {
          var cls = isTargetEntity(entity.pk) ? 'merger-matrix-selected-col' : ''
          var entityField = entity.fields[props.field.name]

          return (
            <td className={cls} key={'td' + idx}>
              <SingleSelection
                identifier={props.field.name}
                pk={entity.pk}
                onChange={props.selectSourceField}
                checked={props.selections.fields[props.field.name] === entity.pk}
                disabled={!isWritableRow}
              >
                <FieldLabel field={entityField}/>
              </SingleSelection>
            </td>
          )
        })
      }
    </tr>
  )
}

FieldRow.propTypes = {
  field: React.PropTypes.object.isRequired,
  entities: React.PropTypes.array.isRequired,
  targetEntity: React.PropTypes.object.isRequired,
  selections: React.PropTypes.object.isRequired,
  selectSourceField: React.PropTypes.func.isRequired
}

export default FieldRow
