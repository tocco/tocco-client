import React from 'react'

const SingleSelectionCell = props => {
  const cls = props.disabled ? 'disabled' : ''

  const clickFnc = () => props.onChange(props.identifier, props.pk)
  return (
    <div className={cls}>
      <input
        className="merge-icon-spacer"
        type="radio"
        disabled={cls}
        onChange={clickFnc}
        name={props.identifier} checked={props.checked}
      />
      <span onClick={clickFnc}>{props.children}</span>
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
