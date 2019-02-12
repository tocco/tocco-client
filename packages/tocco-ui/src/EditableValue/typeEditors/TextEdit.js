import PropTypes from 'prop-types'
import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'

const TextEdit = props => {
  const value = props.value === null ? '' : props.value
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <TextareaAutosize
      rows={2}
      maxRows={20}
      className="form-control"
      name={props.name}
      onChange={handleChange}
      id={props.id}
      value={value}
      disabled={props.readOnly}
    />
  )
}

TextEdit.defaultProps = {
  value: ''
}

TextEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextEdit
