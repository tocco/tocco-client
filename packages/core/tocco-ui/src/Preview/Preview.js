import PropTypes from 'prop-types'

import Icon from '../Icon'
import Typography from '../Typography'
import {validateCssDimension} from '../utilStyles'
import StyledPreview from './StyledPreview'

/**
 * Use <Preview> to display a preview of any kind of file. Provide URLs to thumbnail and file.
 */
const Preview = ({thumbnailUrl, alt, srcUrl, fileName, caption, maxDimensionX, maxDimensionY}) => {
  const previewContent = thumbnailUrl ? (
    <img alt={alt} title={alt} src={thumbnailUrl} />
  ) : (
    <div title={alt}>
      <Icon icon="file-alt" />
    </div>
  )

  return (
    <StyledPreview maxDimensionX={maxDimensionX} maxDimensionY={maxDimensionY}>
      <a target="_blank" rel="noopener noreferrer" href={srcUrl}>
        {previewContent}
      </a>
      {caption && <Typography.Figcaption>{caption}</Typography.Figcaption>}
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
