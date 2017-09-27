import PropTypes from 'prop-types'
import React from 'react'

const Figure = props => {
  const onClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick(props.srcUrl, props.thumbnailUrl)
    }
  }

  return (
    <figure className="tocco-figure">
      <img alt={props.alt} className="thumbnail" src={props.thumbnailUrl} onClick={onClick}/>
      {props.caption && <figcaption className="description">{props.caption}</figcaption>}
    </figure>
  )
}

Figure.propTypes = {
  /**
   * The url to the document (can be any kind of file).
   */
  srcUrl: PropTypes.string.isRequired,
  /**
   * The url to the thumbnail
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
   * Function that will be triggered when clicked on the image. Receives the srcUrl and thumbnailUrl as arguments.
   */
  onClick: PropTypes.func
}

export default Figure
