import PropTypes from 'prop-types'
import React from 'react'
import {download} from 'tocco-util'

import Button from '../Button'
import Link from '../Link'
import Preview from '../Preview'
import {StyledView, StyledButtonsWrapper} from './StyledView'

export const getDownloadUrl = binaryLink =>
  download.addParameterToURL(binaryLink, 'download', true)

const View = ({value, downloadTitle, immutable, onUpload, deleteTitle}) => {
  const isNotUploadedFile = value.binaryLink && value.binaryLink.startsWith('blob:')

  return (
    <StyledView className="StyledView">
      <Preview
        alt={value.fileName}
        {...isNotUploadedFile && {caption: value.fileName}}
        fileName={value.fileName}
        maxDimensionX="96px"
        maxDimensionY="96px"
        srcUrl={value.binaryLink}
        thumbnailUrl={value.thumbnailLink}
      />
      <StyledButtonsWrapper>
        {!immutable
        && <Button
          icon="trash"
          onClick={() => onUpload(null)}
          tabIndex={-1}
          title={deleteTitle || 'delete'}
        />
        }
        <Button>
          <Link
            neutral
            icon="arrow-to-bottom"
            download={value.fileName}
            href={getDownloadUrl(value.binaryLink)}
            tabIndex={-1}
            title={downloadTitle || 'download'}
          />
        </Button>
      </StyledButtonsWrapper>
    </StyledView>
  )
}

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
