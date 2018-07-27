import PropTypes from 'prop-types'
import React from 'react'

import {
  StyledIconToccoWrapper,
  StyledIconToccoSvg
} from './StyledIconTocco'

import {
  inkPropTypes,
  positionPropTypes,
  stylingInk,
  stylingLook,
  stylingPosition
} from '../utilStyles'

const IconTocco = props => {
  return (
    <StyledIconToccoWrapper
      ink={props.ink || stylingInk.BASE}
      look={props.look}
      position={props.position}
      size={props.size}
    >
      <StyledIconToccoSvg size={props.size}>
        <ellipse className="tocco-icon-top-left" cx="25" cy="25" rx="16.8" ry="16.8" />
        <ellipse className="tocco-icon-top-right" cx="75" cy="25" rx="16.8" ry="16.8" />
        <ellipse className="tocco-icon-bottom-left" cx="25" cy="75" rx="16.8" ry="16.8" />
      </StyledIconToccoSvg>
    </StyledIconToccoWrapper>
  )
}

IconTocco.defaultProps = {
  ink: stylingInk.PRIMARY,
  look: stylingLook.FLAT,
  position: stylingPosition.SOLE
}

IconTocco.propTypes = {
  /**
   * Specify if icon is positioned next to text or not to control spacing. Default value is 'prepend'.
   */
  position: positionPropTypes,
  /**
   * Specify color palette. Default value is 'base'.
   */
  ink: inkPropTypes,
  /**
   * Look of button. Default value is 'flat'.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * Specify width and height.
   */
  size: PropTypes.string

}

export default IconTocco
