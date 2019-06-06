import PropTypes from 'prop-types'
import React from 'react'
import Dropzone from 'react-dropzone'

import Icon from '../Icon'
import StyledUploadInput from './StyledUploadInput'
import {design} from '../utilStyles'

const UploadInput = props => {
  const onDrop = files => {
    props.onDrop(files[0])
  }

  return <StyledUploadInput immutable={props.immutable}>
    <Dropzone
      className="dropzone"
      disabled={props.immutable}
      multiple={false}
      onDrop={onDrop}
    >
      <Icon
        icon="upload"
        position={design.position.PREPEND}
      />
      {props.text || 'drag and drop or click'}
    </Dropzone>
  </StyledUploadInput>
}

UploadInput.propTypes = {
  immutable: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  text: PropTypes.string
}

export default UploadInput
