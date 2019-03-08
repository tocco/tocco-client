import PropTypes from 'prop-types'
import React from 'react'

import Preview from '../Preview'
import {bytesToSize} from './helpers'
import Icon from '../Icon'
import {design} from '../utilStyles'

const UploadProgress = props => (
  <div>
    <Preview
      caption={props.file.name}
      maxDimensionX="96px"
      maxDimensionY="96px"
      srcUrl={props.file.preview}
      thumbnailUrl={props.file.type.startsWith('image') ? props.file.preview : null}
    />
    <div className="loadingOverlay">
      <div className="label label-default">
        <Icon
          icon="spinner"
          pulse
          position={design.position.PREPEND}
        />
        <span style={{paddingLeft: '4px'}}>{props.text || 'uploading'} ({bytesToSize(props.file.size)})</span>
      </div>
    </div>
  </div>
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
