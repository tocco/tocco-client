import PropTypes from 'prop-types'
import React from 'react'
import Dropzone from 'react-dropzone'

import Icon from '../Icon'
import StyledUploadInput from './StyledUploadInput'
import {stylingPosition} from '../utilStyles'

const UploadInput = props => {
  const onDrop = files => {
    props.onDrop(files[0])
  }

  return <StyledUploadInput>
    <Dropzone
      className="dropzone"
      disabled={props.readOnly}
      multiple={false}
      onDrop={onDrop}
    >
      <Icon
        icon="fa-upload"
        position={stylingPosition.PREPEND}
      />
      {props.text || 'drag and drop or click'}
    </Dropzone>
  </StyledUploadInput>
}

UploadInput.propTypes = {
  readOnly: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  text: PropTypes.string
}

export default UploadInput
