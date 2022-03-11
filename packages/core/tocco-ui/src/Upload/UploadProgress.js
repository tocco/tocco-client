import PropTypes from 'prop-types'
import React from 'react'

import LoadingSpinner from '../LoadingSpinner'
import Preview from '../Preview'
import {design} from '../utilStyles'
import {bytesToSize} from './helpers'
import {StyledUploadProgress, StyledUploadProgressIconAndText, StyledUploadProgressText} from './StyledComponents'

const UploadProgress = ({file, text}) => (
  <StyledUploadProgress>
    <Preview
      alt={file.name}
      caption={file.name}
      maxDimensionX="96px"
      maxDimensionY="96px"
      srcUrl={file.preview}
      thumbnailUrl={file.type.startsWith('image') ? file.preview : null}
    />
    <StyledUploadProgressIconAndText>
      <LoadingSpinner position={design.position.PREPEND} />
      <StyledUploadProgressText>
        {text || 'uploading'} ({bytesToSize(file.size)})
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
