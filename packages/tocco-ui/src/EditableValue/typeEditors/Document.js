import PropTypes from 'prop-types'
import React from 'react'

import Upload from '../../Upload'

const Document = props => {
  const onUpload = file => {
    if (file === null) {
      props.onChange(null)
    } else {
      props.options.upload(file)
    }
  }

  return (
    <div className="document">
      <Upload
        onUpload={onUpload}
        immutable={props.immutable}
        textResources={{
          upload: props.options.uploadText,
          uploading: props.options.uploadingText,
          delete: props.options.deleteText,
          download: props.options.downloadText
        }}
        value={props.value ? props.value : null}
      />
    </div>
  )
}

Document.propTypes = {
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    upload: PropTypes.func.isRequired,
    uploadText: PropTypes.string,
    uploadingText: PropTypes.string,
    deleteText: PropTypes.string,
    downloadText: PropTypes.string
  }),
  onChange: PropTypes.func,
  value: PropTypes.object
}

export default Document
