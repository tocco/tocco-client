import PropTypes from 'prop-types'
import React from 'react'

/**
 * Can be used to show previews of any kind of file. Therefore an Url to the thumbnail and to the file must be provided.
 */
const Preview = props => {
  const onClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick(props.srcLink, props.thumbnailLink)
    }
  }

  const figure = (
    <figure>
      <img alt={props.alt} className="thumbnail" src={props.thumbnailLink} onClick={onClick}/>
      {props.caption && <figcaption className="description">{props.caption}</figcaption>}
    </figure>
  )

  return (
    <div className="tocco-preview">
      {props.downloadOnClick ? <a href={props.srcLink} alt={props.alt} download>{figure}</a> : figure}
    </div>)
}

Preview.propTypes = {
  /**
   * The url to the image
   */
  srcLink: PropTypes.string.isRequired,
  /**
   * The url to the thumbnail
   */
  thumbnailLink: PropTypes.string.isRequired,
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
   * If true the image will be downloaded on a click event.
   */
  downloadOnClick: PropTypes.bool
}

export default Preview
