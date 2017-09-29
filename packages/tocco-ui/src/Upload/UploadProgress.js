import PropTypes from 'prop-types'
import React from 'react'
import Preview from '../Preview'
import {bytesToSize} from './helpers'

const UploadProgress = props => (
  <div>
    <Preview
      className="transparent"
      style={{maxWidth: '200px'}}
      srcUrl={props.preview.file}
      thumbnailUrl={props.preview.file}
      downloadOnClick={false}
    />
    <div className="loadingOverlay">
      <span className="label label-default">
        <i className="fa fa-spinner fa-spin"></i>
        <span style={{paddingLeft: '4px'}}>{props.text || 'uploading'} ({bytesToSize(props.preview.size)})</span>
      </span>
    </div>
  </div>
)

UploadProgress.propTypes = {
  text: PropTypes.string,
  preview: PropTypes.shape({
    file: PropTypes.string,
    size: PropTypes.number
  })
}

export default UploadProgress
