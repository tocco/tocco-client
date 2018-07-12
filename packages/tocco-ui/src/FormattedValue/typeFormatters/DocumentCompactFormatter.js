import PropTypes from 'prop-types'
import React from 'react'
import ButtonLink from '../../ButtonLink'

const DocumentCompactFormatter = props => (
  <ButtonLink
    alt={props.value.alt || props.value.fileName}
    download={props.value.fileName}
    icon="fa-download"
    look="raised"
    href={props.value.binaryLink}
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
