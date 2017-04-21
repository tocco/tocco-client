import React from 'react'

const SingleSelectionCell = props => {
  const cls = props.disabled ? 'disabled' : ''
  const id = props.identifier + props.pk

  const clickFnc = () => props.onChange(props.identifier, props.pk)
  return (
    <div className={cls}>
      <input
        type="radio"
        disabled={cls}
        onChange={clickFnc}
        checked={props.checked}
        name={props.identifier}
        id={id}
      />
      <label htmlFor={id} className="selection-label">{props.children}</label>
    </div>
  )
}

SingleSelectionCell.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  identifier: React.PropTypes.string.isRequired,
  pk: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node
}

export default SingleSelectionCell
