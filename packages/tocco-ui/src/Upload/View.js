import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Preview from '../Preview'
import StyledView from './StyledView'

const addParameterToURL = (url, param, value) =>
  `${url}${url.indexOf('?') >= 0 ? '&' : '?'}${param}=${value}`

export const getDownloadUrl = binaryLink =>
  addParameterToURL(binaryLink, 'download', true)

const View = props => (
  <StyledView>
    <div>
      <ButtonLink
        icon="download"
        iconPosition="sole"
        download={props.value.fileName}
        href={getDownloadUrl(props.value.binaryLink)}
        tabIndex={-1}
        title={props.downloadTitle || 'download'}
      />
      {!props.readOnly
      && <Button
        icon="times"
        iconPosition="sole"
        onClick={() => props.onUpload(null)}
        tabIndex={-1}
        title={props.deleteTitle || 'delete'}
      />
      }
    </div>
    <Preview
      alt={props.value.fileName}
      caption={props.value.fileName}
      maxDimensionX="96px"
      maxDimensionY="96px"
      srcUrl={props.value.binaryLink}
      thumbnailUrl={props.value.thumbnailLink}
    />
  </StyledView>
)

View.propTypes = {
  readOnly: PropTypes.bool,
  onUpload: PropTypes.func,
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string,
    mimeType: PropTypes.string
  }).isRequired,
  deleteTitle: PropTypes.string,
  downloadTitle: PropTypes.string
}

export default View
