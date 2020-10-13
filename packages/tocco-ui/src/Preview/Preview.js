import PropTypes from 'prop-types'
import React, {useState} from 'react'

import Icon from '../Icon'
import Link from '../Link'
import StyledPreview from './StyledPreview'
import {validateCssDimension} from '../utilStyles'

/**
 * Use <Preview> to display a preview of any kind of file. Provide URLs to thumbnail and file.
 */
const Preview = ({
  onClick,
  thumbnailUrl,
  alt,
  srcUrl,
  fileName,
  downloadOnClick,
  caption,
  maxDimensionX,
  maxDimensionY
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleOnClick = () => {
    if (typeof onClick === 'function') {
      onClick(srcUrl, thumbnailUrl)
    }
  }

  const handleOnLoad = () => setIsLoaded(Math.random())

  const image = thumbnailUrl ? (
    <img
      alt={alt}
      src={thumbnailUrl}
      onClick={handleOnClick}
      onLoad={handleOnLoad}
      data-image-in-cache={isLoaded}
    />
  ) : (
    <Icon
      icon="file-alt"
    />
  )

  const imageWrapper = downloadOnClick && srcUrl && !onClick ? (
    <Link
      alt={fileName || alt}
      download={fileName || caption}
      href={srcUrl}
      label={image}
    />
  ) : (
    image
  )

  const interactive = ((downloadOnClick && srcUrl) || onClick)

  return <StyledPreview
    interactive={interactive}
    maxDimensionX={maxDimensionX}
    maxDimensionY={maxDimensionY}
  >
    {imageWrapper}
  </StyledPreview>
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
