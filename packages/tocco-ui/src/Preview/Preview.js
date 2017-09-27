import PropTypes from 'prop-types'
import React from 'react'
import Figure from './Figure'

/**
 * Can be used to show previews of any kind of file. Therefore an Url to the thumbnail and to the file must be provided.
 */
const Preview = props => {
  const figure = (<Figure
    srcUrl={props.srcUrl}
    thumbnailUrl={props.thumbnailUrl}
    alt={props.alt}
    caption={props.caption}
    onClick={props.onClick}
  />)

  return (
    <div className="tocco-preview">
      {props.downloadOnClick ? <a href={props.srcUrl} alt={props.alt} download>{figure}</a> : figure}
    </div>)
}

Preview.propTypes = {
  /**
   * The url to the document (can be any kind of file).
   */
  srcUrl: PropTypes.string.isRequired,
  /**
   * The url to the thumbnail (must be an image).
   */
  thumbnailUrl: PropTypes.string.isRequired,
  /**
   * Alternative text if the image can't be displayed.
   */
  alt: PropTypes.string,
  /**
   * Caption that will be displayed below the image.
   */
  caption: PropTypes.string,
  /**
   * Function that will be triggered when clicked on the image. Receives the srcLink and thumbnailLink as arguments.
   */
  onClick: PropTypes.func,
  /**
   * If true the image will be wrapped in a link which downloads the document behind the source url (srcUrl).
   */
  downloadOnClick: PropTypes.bool
}

export default Preview
