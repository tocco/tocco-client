import PropTypes from 'prop-types'
import React from 'react'
import {download} from 'tocco-util'

import Button from '../Button'
import Link from '../Link'
import Preview from '../Preview'
import StyledView from './StyledView'

export const getDownloadUrl = binaryLink =>
  download.addParameterToURL(binaryLink, 'download', true)

const View = props => (
  <StyledView>
    <div>
      <Link
        neutral
        icon="download"
        download={props.value.fileName}
        href={getDownloadUrl(props.value.binaryLink)}
        tabIndex={-1}
        title={props.downloadTitle || 'download'}
      />
      {!props.immutable
      && <Button
        icon="times"
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
  immutable: PropTypes.bool,
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
