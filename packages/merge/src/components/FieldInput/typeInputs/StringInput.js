import React from 'react'
import classNames from 'classnames'

const StringInput = props => {
  const value = props.value || ''
  const handleOnChange = event => {
    props.onChange(props.name, event.target.value)
  }

  return (
    <input
      className={classNames('form-control', props.className)}
      type="text"
      value={value}
      onChange={handleOnChange}
      disabled={props.disabled}
    />
  )
}

StringInput.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool
}

export default StringInput
