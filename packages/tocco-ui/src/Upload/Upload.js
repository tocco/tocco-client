import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'
import _isEqual from 'lodash/isEqual'

import View from './View'
import UploadProgress from './UploadProgress'
import UploadInput from './UploadInput'

/**
 * Component to upload files. If uploaded, the file will be displayed by the Preview component.
 */
export const Upload = props => {
  const {
    value,
    textResources,
    onUpload
  } = props
  const [preview, setPreview] = useState({isUploading: false})

  const setUploadingState = file => {
    setPreview({isUploading: true, previewFile: file})
  }

  const abortUploadingState = () => {
    setPreview({isUploading: false, previewFile: null})
  }

  const onDrop = file => {
    setUploadingState(file)
    onUpload(file)
  }

  useEffect(() => {
    if (!_isEqual(value)) {
      abortUploadingState()
    }
  })

  const getContent = props => {
    if (value && value.binaryLink) {
      return <View {...props} deleteTitle={textResources.delete} downloadTitle={textResources.download} />
    } else if (preview.isUploading) {
      return <UploadProgress file={preview.previewFile} text={textResources.uploading} {...props}/>
    }
    return <UploadInput {...props} onDrop={onDrop}/>
  }

  return getContent(props)
}

Upload.defaultProps = {
  textResources: {}
}

Upload.propTypes = {
  /**
   * Callback function if user uploads a file. Return the file {File}
   */
  onUpload: PropTypes.func.isRequired,
  /**
   * Object that contains the following
   */
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string
  }),
  /**
   * Can user upload new files or just view existing
   */
  immutable: PropTypes.bool,
  /**
   * Allows to overwrite texts of the component
   */
  textResources: PropTypes.shape({
    uploading: PropTypes.string,
    delete: PropTypes.string,
    download: PropTypes.string
  })
}

export default Upload
