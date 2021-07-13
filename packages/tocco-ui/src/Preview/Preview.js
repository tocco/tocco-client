import PropTypes from 'prop-types'
import React, {useState} from 'react'

import Icon from '../Icon'
import Typography from '../Typography'
import StyledPreview from './StyledPreview'
import {validateCssDimension} from '../utilStyles'

/**
 * Use <Preview> to display a preview of any kind of file. Provide URLs to thumbnail and file.
 */
const Preview = ({
  thumbnailUrl,
  alt,
  srcUrl,
  fileName,
  caption,
  maxDimensionX,
  maxDimensionY
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleOnLoad = () => setIsLoaded(Math.random())

  const image = thumbnailUrl
    ? <img
      alt={alt}
      title={alt}
      src={thumbnailUrl}
      onLoad={handleOnLoad}
      data-image-in-cache={isLoaded}
    />
    : <div
      alt={alt}
      title={alt}
    >
      <Icon
        icon="file-alt"
      />
    </div>

  return <StyledPreview
    maxDimensionX={maxDimensionX}
    maxDimensionY={maxDimensionY}
  >
    <a target="_blank" rel="noopener noreferrer" alt={alt} href={srcUrl}>
      {image}
    </a>
    {caption && <Typography.Figcaption>{caption}</Typography.Figcaption>}
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
   * Suggest a filename for download.
   */
  fileName: PropTypes.string,
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
