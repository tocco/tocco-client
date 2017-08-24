import PropTypes from 'prop-types'
import React from 'react'
import {FormattedValue} from 'tocco-ui'
import SingleSelection from './SingleSelection'

const FieldRow = props => {
  const isTargetEntity = pk => pk === props.targetEntity.pk
  const isWritableRow = props.targetEntity.fields[props.field.name].writable

  return (
    <tr>
      <td className="bold">{props.field.label}</td>
      {
        props.entities.map((entity, idx) => {
          const cls = isTargetEntity(entity.pk) ? 'merge-matrix-selected-col' : ''
          const entityField = entity.fields[props.field.name]

          return (
            <td className={cls} key={'td' + idx}>
              <SingleSelection
                identifier={props.field.name}
                pk={entity.pk}
                onChange={props.selectSourceField}
                checked={props.selections.fields[props.field.name] === entity.pk}
                disabled={!isWritableRow}
              >
                <FormattedValue type={entityField.type} value={entityField.value}/>
              </SingleSelection>
            </td>
          )
        })
      }
    </tr>
  )
}

FieldRow.propTypes = {
  field: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  targetEntity: PropTypes.object.isRequired,
  selections: PropTypes.object.isRequired,
  selectSourceField: PropTypes.func.isRequired
}

export default FieldRow
