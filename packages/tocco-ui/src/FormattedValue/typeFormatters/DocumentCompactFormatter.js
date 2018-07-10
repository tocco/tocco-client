import PropTypes from 'prop-types'
import React from 'react'

const DocumentFormatter = props => (
  <span className="form-control-static document-compact">
    <a
      download={props.value.fileName}
      href={props.value.binaryLink}
      title={props.options.downloadTitle || 'Download'}
      onClick={e => e.stopPropagation()}
      className="action btn btn-default"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fa fa-download" aria-hidden="true"></i>
    </a>
  </span>
)

DocumentFormatter.propTypes = {
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired
  }).isRequired,
  options: PropTypes.shape({
    downloadTitle: PropTypes.string
  })
}

export default DocumentFormatter
