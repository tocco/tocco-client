import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import Link from '../Link'
import Typography from '../Typography'
import StyledPreview from './StyledPreview'
import {validateCssDimension} from '../utilStyles'

/**
 * Use <Preview> to display a preview of any kind of file. Provide URLs to thumbnail and file.
 */
const Preview = props => {
  const onClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick(props.srcUrl, props.thumbnailUrl)
    }
  }

  const image = props.thumbnailUrl ? (
    <img
      alt={props.alt}
      src={props.thumbnailUrl}
      onClick={onClick}
    />
  ) : (
    <Icon
      icon="fa-file-text-o"
    />
  )

  const imageWrapper = props.downloadOnClick && props.srcUrl && !props.onClick ? (
    <Link
      alt={props.fileName || props.alt}
      download={props.fileName || props.caption}
      href={props.srcUrl}
      label={image}
    />
  ) : (
    image
  )

  const interactive = ((props.downloadOnClick && props.srcUrl) || props.onClick)

  return (
    <StyledPreview
      interactive={interactive}
      maxDimensionX={props.maxDimensionX}
      maxDimensionY={props.maxDimensionY}
    >
      {imageWrapper}
      {props.caption && <Typography.Figcaption>{props.caption}</Typography.Figcaption>}
    </StyledPreview>
  )
}

Preview.propTypes = {
  /**
   * Describe content of file in detail for screen readers, web crawlers and as
   * alternative display if thumbnail can not be loaded.
   */
  alt: PropTypes.string.isRequired,
  /**
   * Describe content of file shortly. Caption is displayed always alongside thumbnail.
   */
  caption: PropTypes.string,
  /**
   * If true the image will be linked (srcUrl).
   */
  downloadOnClick: PropTypes.bool,
  /**
   * Suggest a filename for download.
   */
  fileName: PropTypes.string,
  /**
   * Trigger function by click on image. Receives the srcLink and
   * thumbnailLink as arguments. onClick overrules downloadOnClick.
   */
  onClick: PropTypes.func,
  /**
   * Declare maximal width of displayed image as css property.
   */
  maxDimensionX: validateCssDimension,
  /**
   * Declare maximal height of displayed image as css property.
   */
  maxDimensionY: validateCssDimension,
  /**
   * The url to the document (can be any kind of file).
   */
  srcUrl: PropTypes.string.isRequired,
  /**
   * The url to the thumbnail (must be an image).
   */
  thumbnailUrl: PropTypes.string
}

export default Preview
