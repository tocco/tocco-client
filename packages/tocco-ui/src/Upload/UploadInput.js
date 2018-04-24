import PropTypes from 'prop-types'
import React from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import {theme} from 'styled-system'

import Icon from '../Icon'
import {stylingPosition} from '../utilStyles'

const StyledUploadInput = styled.div`
  border: dashed 1px ${theme('colors.base.fill.2')};
  border-radius: ${theme('radii.2')};
  padding: ${theme('space.3')} ${theme('space.4')};
  cursor: pointer;

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

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
        position={stylingPosition.BEFORE}
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
