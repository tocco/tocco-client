import PropTypes from 'prop-types'
import React from 'react'

import Preview from '../../Preview'

const DocumentFormatter = props => (
  <Preview
    alt={props.value.alt || props.value.fileName}
    caption={props.value.caption || props.value.fileName}
    downloadOnClick={true}
    fileName={props.value.fileName}
    srcUrl={props.value.binaryLink}
    thumbnailUrl={props.value.thumbnailLink}
  />
)

DocumentFormatter.propTypes = {
  value: PropTypes.shape({
    alt: PropTypes.string,
    binaryLink: PropTypes.string.isRequired,
    caption: PropTypes.string,
    fileName: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired
  }).isRequired
}

export default DocumentFormatter
