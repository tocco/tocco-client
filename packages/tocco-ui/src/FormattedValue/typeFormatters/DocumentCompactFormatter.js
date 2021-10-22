import PropTypes from 'prop-types'
import React from 'react'
import {download} from 'tocco-util'
import styled from 'styled-components'

import Link from '../../Link'
import Popover from '../../Popover'

const StyledPreviewImage = styled.img`
  width: 200px;
`

const DocumentCompactFormatter = ({value}) => <>
    <Popover content={<StyledPreviewImage alt={value.fileName} src={value.thumbnailLink}/>}>
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
    </Popover>
    <Link
      alt={value.alt || value.fileName}
      download={value.fileName}
      icon="arrow-to-bottom"
      look="raised"
      href={download.getDownloadUrl(value.binaryLink)}
      onClick={e => {
        e.stopPropagation()
      }}
    />
  </>

DocumentCompactFormatter.propTypes = {
  value: PropTypes.shape({
    alt: PropTypes.string,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired
  }).isRequired
}

export default DocumentCompactFormatter
