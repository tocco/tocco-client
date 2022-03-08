import PropTypes from 'prop-types'
import React from 'react'

import Upload from '../../Upload'

const Document = props => {
  const onUpload = file => {
    if (file === null) {
      if (props.onChange) {
        props.onChange(null)
      }
    } else {
      if (props.options.upload) {
        props.options.upload(file)
      }
    }
  }

  return (
    <Upload
      onUpload={onUpload}
      onChoose={props.options.choose}
      immutable={props.immutable}
      textResources={{
        upload: props.options.uploadText,
        uploading: props.options.uploadingText,
        delete: props.options.deleteText,
        download: props.options.downloadText
      }}
      value={props.value ? props.value : null}
    />
  )
}

Document.defaultProps = {
  options: {}
}

Document.propTypes = {
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    upload: PropTypes.func.isRequired,
    choose: PropTypes.func,
    uploadText: PropTypes.string,
    uploadingText: PropTypes.string,
    deleteText: PropTypes.string,
    downloadText: PropTypes.string
  }),
  onChange: PropTypes.func,
  value: PropTypes.object
}

export default Document
