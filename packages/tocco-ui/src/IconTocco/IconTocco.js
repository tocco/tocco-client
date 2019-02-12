import PropTypes from 'prop-types'
import React from 'react'

import {
  StyledIconToccoWrapper,
  StyledIconToccoSvg
} from './StyledIconTocco'
import {
  positionPropTypes,
  stylingPosition
} from '../utilStyles'

/**
 * Use <IconTocco> as spinner. Circle color is inherited from parent.
 */
const IconTocco = props =>
  <StyledIconToccoWrapper
    position={props.position}
    size={props.size}
  >
    <StyledIconToccoSvg size={props.size}>
      <ellipse className="tocco-icon-top-left" cx="25" cy="25" rx="16.8" ry="16.8" />
      <ellipse className="tocco-icon-top-right" cx="75" cy="25" rx="16.8" ry="16.8" />
      <ellipse className="tocco-icon-bottom-left" cx="25" cy="75" rx="16.8" ry="16.8" />
    </StyledIconToccoSvg>
  </StyledIconToccoWrapper>

IconTocco.defaultProps = {
  position: stylingPosition.SOLE
}

IconTocco.propTypes = {
  /**
   * Specify if icon is positioned next to text or not to control spacing. Default value is 'prepend'.
   */
  position: positionPropTypes,
  /**
   * Specify width and height.
   */
  size: PropTypes.string

}

export default IconTocco
