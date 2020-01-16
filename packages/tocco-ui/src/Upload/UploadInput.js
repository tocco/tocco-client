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
      disabled={props.immutable}
      multiple={false}
      style={{position: 'relative'}}
      onDrop={onDrop}
    >
      <Icon
        icon="upload"
        position={design.position.PREPEND}
        style={{marginRight: '5px'}}
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
