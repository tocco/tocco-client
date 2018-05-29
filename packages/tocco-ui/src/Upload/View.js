import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Preview from '../Preview'
import StyledView from './StyledView'

const View = props => (
  <StyledView>
    <div>
      <ButtonLink
        icon="fa-download"
        iconPosition="solely"
        download={props.value.fileName}
        href={props.value.binaryLink}
        title={props.downloadTitle || 'download'}
      />
      {!props.readOnly
      && <Button
        icon="fa-trash-o"
        iconPosition="solely"
        onClick={() => props.onUpload(null)}
        title={props.deleteTitle || 'delete'}
      />
      }
    </div>
    <Preview
      srcUrl={props.value.binaryLink}
      thumbnailUrl={props.value.thumbnailLink}
      caption={props.value.fileName}
      alt={props.value.fileName}
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
