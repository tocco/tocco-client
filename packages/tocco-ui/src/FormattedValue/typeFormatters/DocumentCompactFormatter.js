import PropTypes from 'prop-types'
import React from 'react'
import {download} from 'tocco-util'

import Link from '../../Link'

const getDownloadUrl = binaryLink =>
  download.addParameterToURL(binaryLink, 'download', true)

const DocumentCompactFormatter = ({value}) => (
  <>
    <Link
      alt={value.alt || value.fileName}
      download={value.fileName}
      icon="external-link"
      look="raised"
      target="_blank"
      href={value.binaryLink}
      onClick={e => {
        e.stopPropagation()
      }}
    />
    <Link
      alt={value.alt || value.fileName}
      download={value.fileName}
      icon="arrow-to-bottom"
      look="raised"
      href={getDownloadUrl(value.binaryLink)}
      onClick={e => {
        e.stopPropagation()
      }}
    />
  </>
)

DocumentCompactFormatter.propTypes = {
  value: PropTypes.shape({
    alt: PropTypes.string,
    binaryLink: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired
  }).isRequired
}

export default DocumentCompactFormatter
