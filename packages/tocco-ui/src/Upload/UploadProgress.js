import PropTypes from 'prop-types'
import React from 'react'
import Preview from '../Preview'
import {bytesToSize} from './helpers'

const UploadProgress = props => (
  <div>
    <Preview
      caption={props.file.name}
      srcUrl={props.file.preview}
      thumbnailUrl={props.file.type.startsWith('image') ? props.file.preview : null}
    />
    <div className="loadingOverlay">
      <div className="label label-default">
        <i className="fa fa-spinner fa-spin"></i>
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
