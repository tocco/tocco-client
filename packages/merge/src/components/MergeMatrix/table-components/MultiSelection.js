import PropTypes from 'prop-types'
import React from 'react'
import sortBy from 'lodash/sortBy'

import * as SelectionUtil from '../../../utils/SelectionUtil'

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
    <div>
      {
        sortBy(props.values, v => v.pk).map((value, idx) => {
          const id = `multiselection${idx}${props.entity.pk}`
          return (
            <div key={`multiselection${idx}`}>
              <input
                type="checkbox"
                disabled={disabled}
                onChange={() => clickFnc(value)}
                checked={isChecked(value.pk)}
                id={id}
              />
              <label htmlFor={id} className="selection-label">{value.label}</label>
            </div>
          )
        })

      }
    </div>
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
