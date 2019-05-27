import PropTypes from 'prop-types'
import React from 'react'
import {download} from 'tocco-util'

import ButtonLink from '../../ButtonLink'

const getDownloadUrl = binaryLink =>
  download.addParameterToURL(binaryLink, 'download', true)

const DocumentCompactFormatter = props => (
  <ButtonLink
    alt={props.value.alt || props.value.fileName}
    download={props.value.fileName}
    icon="download"
    look="raised"
    href={getDownloadUrl(props.value.binaryLink)}
    stopPropagation={true}
  />
)

DocumentCompactFormatter.propTypes = {
  value: PropTypes.shape({
    alt: PropTypes.string,
    binaryLink: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired
  }).isRequired
}

export default DocumentCompactFormatter
