import PropTypes from 'prop-types'
import React from 'react'
import sortBy from 'lodash/sortBy'
import {Typography} from 'tocco-ui'

import * as SelectionUtil from '../../../utils/SelectionUtil'
import {StyledMergeMatrixLabel} from '../StyledMergeMatrix'

const MultiSelection = props => {
  const disabled = (props.disabled) ? 'disabled' : ''

  const isChecked = relationPk => {
    return SelectionUtil.isToManySelected(
      props.selections.toManyRelations,
      props.relationName,
      relationPk,
      props.entity.pk)
  }

  const clickFnc = value => props.onChange(props.relationName, value.pk, props.entity.pk)
  return (
    <React.Fragment>
      {
        sortBy(props.values, v => v.pk).map((value, idx) => {
          return (
            <StyledMergeMatrixLabel
              key={`multiselection${idx}`}>
              <input
                type="checkbox"
                disabled={disabled}
                onChange={() => clickFnc(value)}
                checked={isChecked(value.pk)}
              /><Typography.Span>{value.label}</Typography.Span>
            </StyledMergeMatrixLabel>
          )
        })
      }
    </React.Fragment>
  )
}

MultiSelection.propTypes = {
  values: PropTypes.array.isRequired,
  entity: PropTypes.object.isRequired,
  relationName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selections: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default MultiSelection
