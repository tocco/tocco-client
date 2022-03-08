import PropTypes from 'prop-types'
import React from 'react'

import LoadingSpinner from '../LoadingSpinner'
import Preview from '../Preview'
import {design} from '../utilStyles'
import {bytesToSize} from './helpers'
import {StyledUploadProgress, StyledUploadProgressIconAndText, StyledUploadProgressText} from './StyledUploadProgress'

const UploadProgress = props => (
  <StyledUploadProgress>
    <Preview
      caption={props.file.name}
      maxDimensionX="96px"
      maxDimensionY="96px"
      srcUrl={props.file.preview}
      thumbnailUrl={props.file.type.startsWith('image') ? props.file.preview : null}
    />
    <StyledUploadProgressIconAndText>
      <LoadingSpinner position={design.position.PREPEND} />
      <StyledUploadProgressText>
        {props.text || 'uploading'} ({bytesToSize(props.file.size)})
      </StyledUploadProgressText>
    </StyledUploadProgressIconAndText>
  </StyledUploadProgress>
)

UploadProgress.propTypes = {
  text: PropTypes.string,
  file: PropTypes.shape({
    preview: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string
  })
}

export default UploadProgress
