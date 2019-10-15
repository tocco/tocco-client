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
class Preview extends React.Component {
  state = {
    loaded: false
  }

  handleOnClick = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.srcUrl, this.props.thumbnailUrl)
    }
  }

  handleOnLoad = () => this.setState({loaded: true})

  render() {
    const image = this.props.thumbnailUrl ? (
      <img
        alt={this.props.alt}
        src={this.props.thumbnailUrl}
        onClick={this.handleOnClick}
        onLoad={this.handleOnLoad}
        data-image-in-cache={this.state.loaded}
      />
    ) : (
      <Icon
        icon="file-alt"
      />
    )

    const imageWrapper = this.props.downloadOnClick && this.props.srcUrl && !this.props.onClick ? (
      <Link
        alt={this.props.fileName || this.props.alt}
        download={this.props.fileName || this.props.caption}
        href={this.props.srcUrl}
        label={image}
      />
    ) : (
      image
    )

    const interactive = ((this.props.downloadOnClick && this.props.srcUrl) || this.props.onClick)

    return (
      <StyledPreview
        interactive={interactive}
        maxDimensionX={this.props.maxDimensionX}
        maxDimensionY={this.props.maxDimensionY}
      >
        {imageWrapper}
        {this.props.caption && <Typography.Figcaption>{this.props.caption}</Typography.Figcaption>}
      </StyledPreview>
    )
  }
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
