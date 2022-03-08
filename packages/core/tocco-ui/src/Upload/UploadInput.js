import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import {StyledUploadInput, StyledDropzone} from './StyledUploadInput'

const UploadInput = ({onDrop: onDropProp, immutable, text, onChoose}) => {
  const onDrop = files => onDropProp(files[0])
  const handleClick = e => {
    onChoose()
    e.stopPropagation()
  }

  return (
    <StyledUploadInput immutable={immutable}>
      <StyledDropzone disabled={immutable} multiple={false} onDrop={onDrop} title={text || 'drag and drop or click'}>
        <Button icon="arrow-to-top" />
      </StyledDropzone>
      {onChoose && <Button onClick={handleClick} icon="folder" label={'browse docs'} iconOnly={true} />}
    </StyledUploadInput>
  )
}

UploadInput.propTypes = {
  immutable: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  onChoose: PropTypes.func,
  text: PropTypes.string
}

export default UploadInput
