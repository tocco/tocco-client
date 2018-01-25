import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Figure from './Figure'

/**
 * Can be used to show previews of any kind of file. Therefore an Url to the thumbnail and to the file must be provided.
 */
const Preview = props => {
  const content = props.thumbnailUrl ? (
    <Figure
      srcUrl={props.srcUrl}
      thumbnailUrl={props.thumbnailUrl}
      alt={props.alt}
      caption={props.caption}
      onClick={props.onClick}
    />
  ) : (
    <div className="no-thumbnail">
      <i className="fa fa-file-text-o" aria-hidden="true"></i><span>{props.caption}</span>
    </div>
  )

  const classes = classNames(
    'tocco-preview',
    props.className
  )

  return (
    <div className={classes}>
      {props.downloadOnClick ? <a href={props.srcUrl} alt={props.alt} download={props.caption}>{content}</a> : content}
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
  thumbnailUrl: PropTypes.string,
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
  downloadOnClick: PropTypes.bool,
  /**
   * CSS class that gets added to root element of preview
   */
  className: PropTypes.string

}

export default Preview
