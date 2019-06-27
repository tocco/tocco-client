import PropTypes from 'prop-types'
import React from 'react'
import _isEqual from 'lodash/isEqual'

import View from './View'
import UploadProgress from './UploadProgress'
import UploadInput from './UploadInput'

/**
 * Component to upload files. If uploaded, the file will be displayed by the Preview component.
 */
export class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isUploading: false,
      value: null
    }
  }

  setUploadingState(file) {
    this.setState({isUploading: true, previewFile: file})
  }

  onDrop(file) {
    this.setUploadingState(file)
    this.props.onUpload(file)
  }

  static getDerivedStateFromProps(props, state) {
    if (!_isEqual(props.value, state.value)) {
      return {
        isUploading: false,
        previewFile: null,
        value: props.value
      }
    }
    return null
  }

  getContent(props) {
    if (props.value && props.value.binaryLink) {
      return <View {...props} deleteTitle={props.textResources.delete} downloadTitle={props.textResources.download} />
    } else {
      if (this.state.isUploading) {
        return <UploadProgress file={this.state.previewFile} text={props.textResources.uploading} {...props}/>
      } else {
        return <UploadInput {...props} text={props.textResources.upload} onDrop={this.onDrop.bind(this)}/>
      }
    }
  }

  render() {
    const props = this.props
    return this.getContent(props)
  }
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
    upload: PropTypes.string,
    uploading: PropTypes.string,
    delete: PropTypes.string,
    download: PropTypes.string
  })
}

export default Upload
