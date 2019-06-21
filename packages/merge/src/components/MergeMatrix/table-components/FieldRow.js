import PropTypes from 'prop-types'
import React from 'react'
import {FormattedValue} from 'tocco-ui'

import SingleSelection from './SingleSelection'
import {StyledMergeMatrixTd} from '../StyledMergeMatrix'

const FieldRow = props => {
  const isTargetEntity = pk => pk === props.targetEntity.pk
  const isWritableRow = props.targetEntity.fields[props.field.name].writable

  return (
    <tr>
      <StyledMergeMatrixTd bold>{props.field.label}</StyledMergeMatrixTd>
      {
        props.entities.map((entity, idx) => {
          const entityField = entity.fields[props.field.name]
          return (
            <StyledMergeMatrixTd
              disabled={!isWritableRow}
              selected={isTargetEntity(entity.pk)}
              key={'td' + idx}>
              <SingleSelection
                identifier={props.field.name}
                pk={entity.pk}
                onChange={props.selectSourceField}
                checked={props.selections.fields[props.field.name] === entity.pk}
                disabled={!isWritableRow}>
                <FormattedValue type={entityField.type} value={entityField.value}/>
              </SingleSelection>
            </StyledMergeMatrixTd>
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
