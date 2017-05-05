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
  onChange: React.PropTypes.func,
  value: React.PropTypes.node,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  readOnly: React.PropTypes.bool
}

export default HtmlEdit
