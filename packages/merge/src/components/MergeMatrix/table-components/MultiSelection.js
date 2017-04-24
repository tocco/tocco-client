import React from 'react'
import * as SelectionUtil from '../../../utils/SelectionUtil'
import sortBy from 'lodash/sortBy'

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
  values: React.PropTypes.array.isRequired,
  entity: React.PropTypes.object.isRequired,
  relationName: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  selections: React.PropTypes.object.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default MultiSelection
