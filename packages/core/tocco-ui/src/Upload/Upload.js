import _isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import {useState, useEffect, useRef} from 'react'

import UploadInput from './UploadInput'
import UploadProgress from './UploadProgress'
import View from './View'

/**
 * Component to upload files. If uploaded, the file will be displayed by the Preview component.
 */
export const Upload = props => {
  const {value, textResources, onUpload, onChoose} = props
  const valueRef = useRef(value)
  const [states, setStates] = useState({
    isUploading: false,
    previewFile: null
  })

  const setUploadingState = file => {
    setStates({
      isUploading: true,
      previewFile: file
    })
  }

  const abortUploadingState = () => {
    setStates({
      isUploading: false,
      previewFile: null
    })
  }

  const onDrop = file => {
    setUploadingState(file)
    onUpload(file)
  }

  useEffect(() => {
    if (!_isEqual(valueRef.current, value)) {
      abortUploadingState()
    }
    valueRef.current = value
  }, [value])

  if (value?.binaryLink) {
    return <View {...props} deleteTitle={textResources.delete} downloadTitle={textResources.download} />
  } else if (states.isUploading) {
    return <UploadProgress file={states.previewFile} text={textResources.uploading} {...props} />
  }
  return <UploadInput {...props} onDrop={onDrop} onChoose={onChoose} />
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
   * Callback function if user chooses resource from dms. If not set option is not available
   */
  onChoose: PropTypes.func,
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
