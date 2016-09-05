import React from 'react'
import SelectionUtil from '../../../../../utils/SelectionUtil'

const MultiSelection = props => {
  var disabled = (props.disabled) ? 'disabled' : ''

  var isChecked = relationPk => {
    return SelectionUtil.isToManySelected(
      props.selections.toManyRelations,
      props.relationName,
      relationPk,
      props.entity.pk)
  }

  var clickFnc = (value) => props.onChange(props.relationName, value.pk, props.entity.pk)

  return (
    <div>
      {
        props.values.map((value, idx) => {
          return (
            <div key={`multiselection${idx}`}>
              <input
                type="checkbox"
                className="merger-icon-spacer"
                disabled={disabled}
                onChange={() => clickFnc(value)}
                checked={isChecked(value.pk)}
              />
              <span onClick={() => clickFnc(value)} className={disabled}>{value.label}</span>
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
