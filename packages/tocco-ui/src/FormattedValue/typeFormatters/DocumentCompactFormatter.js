import PropTypes from 'prop-types'
import React from 'react'
import {download, html} from 'tocco-util'
import _get from 'lodash/get'

import Link from '../../Link'
import Popover from '../../Popover'

const DocumentCompactFormatter = ({value, options}) => {
  const {tooltips, loadTooltip} = options || {}
  const tooltip = _get(tooltips, value.resourceKey, null)

  return (
    <>
      <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(tooltip)}}/> : null}>
        <span onMouseOver={() => loadTooltip && !tooltip && loadTooltip(value.resourceKey)}>
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
        </span>
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
  )
}

DocumentCompactFormatter.propTypes = {
  value: PropTypes.shape({
    alt: PropTypes.string,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    resourceKey: PropTypes.string
  }).isRequired,
  options: PropTypes.shape({
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func
  })
}

export default DocumentCompactFormatter
