import PropTypes from 'prop-types'
import React from 'react'
import Preview from '../Preview'

const View = props => (
  <div>
    <div className="actions">
      <a
        href={props.value.binaryLink}
        title={props.downloadTitle || 'download'}
        className="action btn btn-default"
        download={props.value.fileName}
      >
        <i className="fa fa-download" aria-hidden="true"></i>
      </a>
      {!props.readOnly
      && <button
        type="button"
        title={props.deleteTitle || 'delete'}
        className="action btn btn-danger"
        onClick={() => props.onUpload(null)}
      >
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </button>}
    </div>
    <Preview
      srcUrl={props.value.binaryLink}
      thumbnailUrl={props.value.thumbnailLink}
      caption={props.value.fileName}
      alt={props.value.fileName}
      downloadOnClick
    />

  </div>
)

View.propTypes = {
  readOnly: PropTypes.bool,
  onUpload: PropTypes.func,
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired
  }).isRequired,
  deleteTitle: PropTypes.string,
  downloadTitle: PropTypes.string
}

export default View
