import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Icon from '../Icon'
import StyledUploadInput from './StyledUploadInput'
import {design} from '../utilStyles'
import {StyledDropzone, StyledIconWrapper} from './SyledUploadInput'

const UploadInput = ({onDrop: onDropProp, immutable, text}) => {
  const onDrop = files => onDropProp(files[0])

  return (
    <StyledUploadInput immutable={immutable}>
      <StyledDropzone
        disabled={immutable}
        multiple={false}
        onDrop={onDrop}
        title={text || 'drag and drop or click'}
      >
        <StyledIconWrapper>
          <Button>
            <Icon
              icon="upload"
              position={design.position.PREPEND}
            />
          </Button>
        </StyledIconWrapper>
      </StyledDropzone>
    </StyledUploadInput>
  )
}

UploadInput.propTypes = {
  immutable: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  text: PropTypes.string
}

export default UploadInput
