import PropTypes from 'prop-types'
import React from 'react'
import ReactQuill from 'react-quill'

import '!style-loader!css-loader!react-quill/dist/quill.core.css'
import '!style-loader!css-loader!react-quill/dist/quill.snow.css'

const HtmlEdit = props => {
  const handleChange = value => {
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <ReactQuill
      name={props.name}
      onChange={handleChange}
      id={props.id}
      theme="snow"
      value={props.value}
      readOnly={props.readOnly}
      modules={{
        toolbar: !props.readOnly
      }}
    />
  )
}

HtmlEdit.defaultProps = {
  value: ''
}

HtmlEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default HtmlEdit
