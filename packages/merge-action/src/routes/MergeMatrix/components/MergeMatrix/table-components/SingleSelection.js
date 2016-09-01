import React from 'react'

const SingleSelectionCell = props => {
  var cls = props.disabled ? 'disabled' : ''

  return (
    <div className={cls}>
      <input
        className="merger-icon-spacer"
        type="radio"
        disabled={cls}
        onChange={() => props.onChange(props.identifier, props.pk)}
        name={props.identifier} checked={props.checked}
      />
      {props.children}
    </div>
  )
}

SingleSelectionCell.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  identifier: React.PropTypes.string.isRequired,
  pk: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default SingleSelectionCell
