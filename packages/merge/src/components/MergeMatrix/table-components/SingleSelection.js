import PropTypes from 'prop-types'
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
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  identifier: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default SingleSelectionCell
