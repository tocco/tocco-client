import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Icon from '../Icon'

/**
 * Can be used to show previews of any kind of file. Therefore an Url to the thumbnail and to the file must be provided.
 */

const StyledPreview = styled.figure`
  && {
    vertical-align: top;
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    > * {
      flex: 1 1 auto;
    }

    img {
      max-width: 100%;

      ${props => {
    if (props.interactive) {
      return `
            &:hover,
            &:focus {
              opacity: .7;
            }
      `
    }
  }}
    }

    figcaption {
      text-align: center;
    }
  }
`

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
    <a href={props.srcUrl} alt={props.alt} download={props.caption}>{image}</a>
  ) : (
    image
  )

  const interactive = ((props.downloadOnClick && props.srcUrl) || props.onClick)

  return (
    <StyledPreview interactive={interactive}>
      {imageWrapper}
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </StyledPreview>
  )
}

Preview.propTypes = {
  /**
   * Alternative text if the image can't be displayed.
   */
  alt: PropTypes.string,
  /**
   * Caption that will be displayed below the image.
   */
  caption: PropTypes.string,
  /**
   * If true the image will be linked (srcUrl).
   */
  downloadOnClick: PropTypes.bool,
  /**
   * Trigger function by click on image. Receives the srcLink and
   * thumbnailLink as arguments. onClick overrules downloadOnClick.
   */
  onClick: PropTypes.func,
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
